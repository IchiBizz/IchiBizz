import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { ProductContext } from "../../contexts/ProductContext";

export default class DashboardSeller extends Component {
  static contextType = ProductContext;

  render() {
    console.log(this.context);
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={this.props.value !== this.props.index}
        id={`seller-tabpanel-${this.props.index}`}
        aria-labelledby="seller-tabpanel"
      >
        helooss!!
        {/* <Box p={3}>{children}</Box> */}
      </Typography>
    );
  }
}
