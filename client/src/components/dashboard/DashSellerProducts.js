import React, { Component, useState, useContext } from "react";
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
import { SessionUserContext } from "../../contexts/SessionUserContext";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import useStyles from "./DashboardStyles";

const DashSellerProducts = props => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const user = useContext(SessionUserContext);
  const { products, updateProductData } = useContext(ProductContext);

  const handleChangeRowsPerPage = event => {
    let value = +event.target.value;
    setRowsPerPage(value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpen = id => {
    setAlertOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setAlertOpen(false);
  };

  const handleDelete = () => {
    axios.delete(`/api/products/${deleteId}`).then(() => {
      setDeleteId("");

      let updatedProductState = products.filter(product => product);

      updateProductData(updatedProductState);
      handleClose();
      // props.history.push("/dashboard");
    });
  };

  const classes = useStyles();

  let filteredProduct = products.filter(product => {
    return product.seller === user._id;
  });

  console.log("seller product", filteredProduct);

  return (
    <>
      {console.log(products)}
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
            {filteredProduct
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(data => {
                return (
                  <TableRow>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.quantity}</TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>{data.isSold ? "Sold" : "Available"}</TableCell>
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
                          <DeleteIcon onClick={() => handleOpen(data._id)} />
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
          count={filteredProduct.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "previous page"
          }}
          nextIconButtonProps={{
            "aria-label": "next page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={alertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this product?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashSellerProducts;
