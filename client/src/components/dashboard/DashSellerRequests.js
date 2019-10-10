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
import { UserContext } from "../../contexts/UserContext";

import axios from "axios";
import useStyles from "./DashboardStyles";

const DashSellerRequests = props => {
  const user = useContext(SessionUserContext);
  const userList = useContext(UserContext);
  const { products, updateProductData } = useContext(ProductContext);

  //TODO: review
  let handleCheckChange = event => {
    let value = event.target.value;
    let index = value.indexOf("#");
    let productId = value.slice(0, index);
    let buyerId = value.slice(index + 1);

    products.forEach(product => {
      if (product._id === productId) {
        product.isSold = event.target.checked;
        axios
          .put(`api/products/sell/${productId}`, {
            isSold: event.target.checked,
            buyer: buyerId
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
    return product.seller === user.user._id;
  });

  let filteredBuyer = userList.state.users.filter(user => {
    products.some(product => {
      return user._id === product.buyer;
    });
  });
  console.log("product list", filteredProduct);
  console.log("buyer list", filteredBuyer);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Requests to buy</h1>
      <div>
        {filteredProduct.map(product => {
          console.log("buyer", product.buyer);
          return (
            <>
              <Paper>
                <img
                  style={{ height: "100px" }}
                  src={`${product.imageUrl[0]}`}
                  alt="product-image"
                />
                <Typography variant="h5" component="h3">
                  {product.title}
                </Typography>
                <Typography variant="h6" component="h3">
                  Price: EUR {product.price}, Quantity: {product.quantity}
                </Typography>
                <Typography component="p">
                  <Table>
                    <TableBody>
                      {product.requested.map(reqUser => {
                        return (
                          <>
                            {!product.buyer ? (
                              <TableRow>
                                <TableCell>
                                  {reqUser.firstName} {reqUser.lastName}
                                </TableCell>
                                <TableCell>{reqUser.email}</TableCell>
                                <TableCell>
                                  Sell
                                  <Checkbox
                                    checked={product.isSold}
                                    onChange={handleCheckChange}
                                    value={`${product._id}#${reqUser._id}`}
                                    inputProps={{
                                      "aria-label": "sales checkbox"
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            ) : (
                              <TableRow>
                                <TableCell>
                                  BUYER NAME
                                  {/* {user.firstName}
                                  {user.lastName} */}
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                  Sell
                                  <Checkbox
                                    disabled
                                    checked
                                    value={product._id}
                                    inputProps={{
                                      "aria-label": "sales checkbox"
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            )}
                          </>
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

export default DashSellerRequests;