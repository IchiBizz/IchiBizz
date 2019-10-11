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
  const user = useContext(SessionUserContext);
  const { products, updateProductData } = useContext(ProductContext);

  let filteredProduct = products.filter(product => {
    return product.buyer ? product.buyer._id === user.user._id : false;
  });

  console.log("buyer filered", filteredProduct);

  const classes = useStyles();

  return (
    <>
      <h2 style={{ textAlign: "left", marginLeft: "10px"}}>Your Orders</h2>
      {filteredProduct.map(product => {
        return (
          <ExpansionPanel style={{ margin: "1% 5%" }}>
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
                  style={{ height: "200px" }}
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
