import React, { Component } from "react";
import { Typography } from "@material-ui/core";

export default class DashboardBuyer extends Component {
  render() {
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={this.props.value !== this.props.index}
        id={`buyer-tabpanel-${this.props.index}`}
        aria-labelledby="buyer-tabpanel"
      >
        helooss buyer!!
        {/* <Box p={3}>{children}</Box> */}
      </Typography>
    );
  }
}
