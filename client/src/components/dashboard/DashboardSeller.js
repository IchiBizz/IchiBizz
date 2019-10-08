import React, { Component } from "react";
import { Typography } from "@material-ui/core";

export default class DashboardSeller extends Component {
  render() {
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
