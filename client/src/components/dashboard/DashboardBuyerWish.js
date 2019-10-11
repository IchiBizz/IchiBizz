import React, { Component, useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Typography,
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
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import useStyles from "./DashboardStyles";

const DashboardBuyerWish = props => {
  console.log("props", props);
  const user = useContext(SessionUserContext);
  const { products, updateProductData } = useContext(ProductContext);

  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

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

  const handleRemove = () => {
    let id = deleteId;
    axios.put(`/api/products/wish/remove/${id}`).then(response => {
      setDeleteId("");
      handleClose();
      let updatedProducts = products.filter(product => product._id !== id);
      updateProductData(updatedProducts);
    });
  };

  let filteredProduct = products.filter(product => {
    return product.wishlist.some(wish => {
      return wish._id === user.user._id;
    });
  });

  console.log("product", products);
  console.log("wishlist", filteredProduct);
  console.log("user id", user.user._id);

  return (
    <>
      <h2 style={{ textAlign: "left", marginLeft: "10px" }}>Your Wishlist</h2>
      <Paper className="soldProductContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>

              <TableCell>Title</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProduct
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(data => {
                return (
                  <TableRow key={data._id}>
                    <TableCell>
                      <img
                        style={{ height: "100px" }}
                        src={`${data.imageUrl[0]}`}
                        alt="product-image"
                      />
                    </TableCell>
                    <TableCell>
                      <Link to={`/products/${data._id}`}>{data.title}</Link>
                    </TableCell>
                    <TableCell>{data.quantity}</TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>{data.isSold ? "Sold" : "Available"}</TableCell>
                    <TableCell>
                      <Tooltip title="Remove">
                        <IconButton aria-label="remove">
                          <CancelIcon onClick={() => handleOpen(data._id)} />
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
          {"Are you sure you want to remove from Wishlist?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemove} color="primary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardBuyerWish;
