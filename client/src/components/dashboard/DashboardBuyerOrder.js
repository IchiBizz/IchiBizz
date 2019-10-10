import React, { Component, useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { ProductContext } from "../../contexts/ProductContext";
import { SessionUserContext } from "../../contexts/SessionUserContext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./DashboardStyles";

const DashboardBuyerOrder = props => {
  console.log("props", props);
  const user = useContext(SessionUserContext);
  const { products, updateProductData } = useContext(ProductContext);

  let filteredProduct = products.filter(product => {
    return product.buyer === user.user._id;
  });

  console.log("buyer filered", filteredProduct);

  const classes = useStyles();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Your Orders</h1>
      {filteredProduct.map(product => {
        return (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {product.title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <img
                  style={{ height: "15%" }}
                  src={`${product.imageUrl[0]}`}
                  alt="product-image"
                />
                <div>Price: EUR {product.price}</div>
                <div>Quantity: {product.quantity}</div>
                <div>{product.description}</div>
                {/* <div>Seller: {product.seller.name}</div> */}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </>
  );
};

export default DashboardBuyerOrder;
