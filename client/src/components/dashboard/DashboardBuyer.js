import React, { Component } from "react";
import DashboardBuyerWish from "./DashboardBuyerWish";
import DashboardBuyerOrder from "./DashboardBuyerOrder";
import { ProductContext } from "../../contexts/ProductContext";
import { SessionUserContext } from "../../contexts/SessionUserContext";
import { Typography } from "@material-ui/core";

export default class DashboardBuyer extends Component {
  render() {
    return (
      <>
        <Typography
          component="div"
          role="tabpanel"
          hidden={this.props.value !== this.props.index}
          id={`seller-tabpanel-${this.props.index}`}
          aria-labelledby="seller-tabpanel"
        >
          <ProductContext.Consumer>
            {({ products, updateProductData }) => {
              return (
                <SessionUserContext.Consumer>
                  {user => {
                    return (
                      <DashboardBuyerWish
                        products={products}
                        updateProductData={updateProductData}
                        user={user}
                      />
                    );
                  }}
                </SessionUserContext.Consumer>
              );
            }}
          </ProductContext.Consumer>
          <DashboardBuyerOrder />
        </Typography>
      </>
    );
  }
}
