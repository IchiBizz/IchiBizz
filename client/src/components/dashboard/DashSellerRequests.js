import React, { Component, useState, useContext } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
  withStyles
} from "@material-ui/core";
import { ProductContext } from "../../contexts/ProductContext";
import { SessionUserContext } from "../../contexts/SessionUserContext";
import axios from "axios";
import useStyles from "./DashboardStyles";

const DashSellerRequests = props => {
  const user = useContext(SessionUserContext);
  const { products, updateProductData } = useContext(ProductContext);

  //TODO: review
  let handleCheckChange = event => {
    let soldId = event.target.value;
    products.forEach(product => {
      if (!product.buyer && product._id === event.target.value) {
        product.isSold = event.target.checked;
        axios
          .put(`api/products/sell/${soldId}`, {
            isSold: event.target.checked
          })
          .then(response => {
            let updatedProducts = products.map(product => {
              if (product._id === response.data._id) return response.data;
              else return product;
            });
            updateProductData(updatedProducts);
          });
      }
    });
  };

  let filteredProduct = products.filter(product => {
    return product.seller === user._id;
  });

  console.log("product list", filteredProduct);
  // for styling
  const classes = useStyles();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Requests to buy</h1>
      <div className={classes.requesterContainer}>
        {filteredProduct.map(product => {
          return (
            <>
              <Paper className={classes.requesterRoot}>
                <Typography variant="h5" component="h3">
                  {product.title}
                </Typography>
                <Typography variant="h6" component="h3">
                  Price: EUR {product.price}, Quantity: {product.quantity}
                </Typography>
                <Typography component="p">
                  <Table className={classes.table}>
                    <TableBody>
                      {product.requested.map(user => {
                        console.log("requested", user);
                        return (
                          <TableRow>
                            <TableCell>
                              {user.firstName} {user.lastName}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              Sold
                              <Checkbox
                                checked={product.isSold}
                                onChange={handleCheckChange}
                                value={product._id}
                                inputProps={{
                                  "aria-label": "sales checkbox"
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Typography>
              </Paper>
            </>
          );
        })}
      </div>
    </>
  );
};

export default withStyles(useStyles)(DashSellerRequests);
