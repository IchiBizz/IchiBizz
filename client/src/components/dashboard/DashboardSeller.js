import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import { ProductContext } from "../../contexts/ProductContext";

export default class DashboardSeller extends Component {
  static contextType = ProductContext;

  state = {
    columns: [
      { title: "Title", field: "title" },
      { title: "Quantity", field: "quantity" },
      { title: "Price", field: "price" },
      { title: "Sales status", field: "isSold" }
    ],
    data: this.context.state.products
  };

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
        <MaterialTable
          title="Items for Sale"
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            // onRowAdd: newData =>
            //   new Promise(resolve => {
            //     setTimeout(() => {
            //       resolve();
            //       const data = [...this.state.data];
            //       data.push(newData);
            //       setState({ ...this.state, data });
            //     }, 600);
            //   }),
            // onRowUpdate: (newData, oldData) =>
            //   new Promise(resolve => {
            //     setTimeout(() => {
            //       resolve();
            //       const data = [...state.data];
            //       data[data.indexOf(oldData)] = newData;
            //       setState({ ...state, data });
            //     }, 600);
            //   }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  data.splice(data.indexOf(oldData), 1);
                  this.setState({ ...this.state, data });
                }, 600);
              })
          }}
        />
      </Typography>
    );
  }
}
