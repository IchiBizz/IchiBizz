import React, { Component } from "react";
import DashSellerProducts from "./DashSellerProducts";
import DashSellerRequests from "./DashSellerRequests";
import { Typography } from "@material-ui/core";

const DashboardSeller = props => {
  const { children, value, index, ...other } = props;
  return (
    <>
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`seller-tabpanel-${index}`}
        aria-labelledby="seller-tabpanel"
      >
        <DashSellerProducts />
        <DashSellerRequests />
      </Typography>
    </>
  );
};
export default DashboardSeller;
