import React, { Component } from "react";
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
import axios from "axios";
import useStyles from "./DashboardStyles";

class DashSellerRequests extends Component {
  static contextType = ProductContext;

  handleCheckChange = event => {
    console.log("event", event);
    let products = this.context.state.products;
    let soldId = event.target.value;
    console.log();
    products.forEach(product => {
      if (!product.buyer && product._id === event.target.value) {
        product.isSold = event.target.checked;
        axios
          .put(`api/products/sell/${soldId}`, {
            isSold: event.target.checked
            // userId:{add session user id here}
          })
          .then(response => {
            console.log("response", response);
            this.context.updateProductData(this.context.state.products);
          });
      }
    });
  };

  render() {
    // TODO: filter products with seller id and session user id
    let ownerSalesProduct = this.context.state.products.filter(product => {
      return product;
    });

    // for styling
    const { classes } = this.props;

    return (
      <>
        <h1 style={{ textAlign: "center" }}>Requests to buy</h1>
        <div className={classes.requesterContainer}>
          {ownerSalesProduct.map(product => {
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
                                  onChange={this.handleCheckChange}
                                  value={user._id}
                                  name={product._id}
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
  }
}

export default withStyles(useStyles)(DashSellerRequests);
