import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
  Paper,
  TablePagination,
  Fab
} from "@material-ui/core";
import { ProductContext } from "../../contexts/ProductContext";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import useStyles from "./DashboardStyles";

class DashSellerProducts extends Component {
  static contextType = ProductContext;

  state = {
    alertOpen: false,
    deleteId: "",
    rowsPerPage: 5,
    page: 0
  };

  handleChangeRowsPerPage = event => {
    let value = +event.target.value;
    this.setState({
      rowsPerPage: value,
      page: 0
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleOpen = id => {
    console.log(id);
    this.setState({
      alertOpen: true,
      deleteId: id
    });
  };

  handleClose = () => {
    console.log(this.props);
    this.setState({
      alertOpen: false
    });
  };

  handleDelete = () => {
    console.log(this.props);
    let id = this.state.deleteId;
    axios.delete(`/api/products/${id}`).then(() => {
      this.setState({
        deleteId: ""
      });

      let updatedProductState = this.context.state.products.filter(
        product => product._id !== id
      );

      this.context.updateProductData(updatedProductState);
      this.handleClose();
      // this.props.history.push("/dashboard");
    });
  };

  render() {
    console.log(this.context);
    console.log(this.context.state.products);

    // TODO: filter products with seller id and session user id
    let ownerSalesData = this.context.state.products.filter(product => {
      return product.seller;
    });

    const classes = useStyles;

    return (
      <>
        <h1 style={{ textAlign: "center" }}>Your Products</h1>
        <Link to={"/products/new"}>
          <Fab
            color="secondary"
            variant="extended"
            aria-label="add-product"
            className={classes.fab}
          >
            <AddIcon className={classes.extendedIcon} />
            Add Product
          </Fab>
        </Link>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {ownerSalesData
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map(data => {
                  return (
                    <TableRow>
                      <TableCell>{data.title}</TableCell>
                      <TableCell>{data.quantity}</TableCell>
                      <TableCell>{data.price}</TableCell>
                      <TableCell>
                        {data.isSold ? "Sold" : "Available"}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton aria-label="edit">
                            <Link to={`/products/${data._id}`}>
                              <EditIcon />
                            </Link>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Delete">
                          <IconButton aria-label="delete">
                            <DeleteIcon
                              onClick={() => this.handleOpen(data._id)}
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={ownerSalesData.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            backIconButtonProps={{
              "aria-label": "previous page"
            }}
            nextIconButtonProps={{
              "aria-label": "next page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        <Dialog
          open={this.state.alertOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this product?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withRouter(DashSellerProducts);
