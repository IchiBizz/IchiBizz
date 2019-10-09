// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
// import {
//   Typography,
//   Table,
//   TableBody,
//   TableHead,
//   TableRow,
//   TableCell,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogTitle,
//   IconButton,
//   Tooltip,
//   Paper,
//   TablePagination,
//   Fab
// } from "@material-ui/core";
// import { ProductContext } from "../../contexts/ProductContext";
// import DeleteIcon from "@material-ui/icons/Delete";
// import axios from "axios";
// import useStyles from "./DashboardStyles";

// class DashboardBuyer extends Component {
//   static contextType = ProductContext;

//   state = {
//     alertOpen: false,
//     deleteId: "",
//     rowsPerPage: 5,
//     page: 0
//   };

//   handleChangeRowsPerPage = event => {
//     let value = +event.target.value;
//     this.setState({
//       rowsPerPage: value,
//       page: 0
//     });
//   };

//   handleChangePage = (event, newPage) => {
//     this.setState({
//       page: newPage
//     });
//   };

//   handleOpen = id => {
//     console.log(id);
//     this.setState({
//       alertOpen: true,
//       deleteId: id
//     });
//   };

//   handleClose = () => {
//     console.log(this.props);
//     this.setState({
//       alertOpen: false
//     });
//   };

//   handleRemove = () => {
//     console.log(this.props);
//     let id = this.state.deleteId;
//     axios
//       .put(`/api/products/wish/remove/${id}`, {
//         // userId: add session userID
//       })
//       .then(() => {
//         this.setState({
//           deleteId: ""
//         });
//         this.handleClose();
//       });
//   };

//   render() {
//     console.log(this.context);
//     console.log(this.context.state.products);

//     // TODO: filter products with seller id and session user id
//     let ownerSalesData = this.context.state.products.filter(product => {
//       return product.seller;
//     });

//     const classes = useStyles;

//     return (
//       <>
//         <Typography
//           component="div"
//           role="tabpanel"
//           hidden={this.props.value !== this.props.index}
//           id={`buyer-tabpanel-${this.props.index}`}
//           aria-labelledby="buyer-tabpanel"
//         >
//           <h1 style={{ textAlign: "center" }}>Your Wishlist</h1>
//           <Paper>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Title</TableCell>
//                   <TableCell>Quantity</TableCell>
//                   <TableCell>Price</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell />
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {ownerSalesData
//                   .slice(
//                     this.state.page * this.state.rowsPerPage,
//                     this.state.page * this.state.rowsPerPage +
//                       this.state.rowsPerPage
//                   )
//                   .map(data => {
//                     return (
//                       <TableRow>
//                         <TableCell>{data.title}</TableCell>
//                         <TableCell>{data.quantity}</TableCell>
//                         <TableCell>{data.price}</TableCell>
//                         <TableCell>
//                           {data.isSold ? "Sold" : "Available"}
//                         </TableCell>
//                         <TableCell>
//                           <Tooltip title="Remove">
//                             <IconButton aria-label="remove">
//                               <DeleteIcon
//                                 onClick={() => this.handleOpen(data._id)}
//                               />
//                             </IconButton>
//                           </Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={ownerSalesData.length}
//               rowsPerPage={this.state.rowsPerPage}
//               page={this.state.page}
//               backIconButtonProps={{
//                 "aria-label": "previous page"
//               }}
//               nextIconButtonProps={{
//                 "aria-label": "next page"
//               }}
//               onChangePage={this.handleChangePage}
//               onChangeRowsPerPage={this.handleChangeRowsPerPage}
//             />
//           </Paper>
//           <Dialog
//             open={this.state.alertOpen}
//             onClose={this.handleClose}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//           >
//             <DialogTitle id="alert-dialog-title">
//               {"Are you sure you want to remove from Wishlist?"}
//             </DialogTitle>
//             <DialogActions>
//               <Button onClick={this.handleClose} color="primary">
//                 Cancel
//               </Button>
//               <Button onClick={this.handleRemove} color="primary" autoFocus>
//                 Remove
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </Typography>
//       </>
//     );
//   }
// }

// export default withRouter(DashboardBuyer);
