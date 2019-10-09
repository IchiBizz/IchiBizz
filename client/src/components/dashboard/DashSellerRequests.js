// import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
// import {
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
//   Checkbox
// } from "@material-ui/core";
// import { ProductContext } from "../../contexts/ProductContext";
// import { UserContext } from "../../contexts/UserContext";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
// import axios from "axios";

// class DashSellerRequests extends Component {
//   static contextType = ProductContext;

//   state = {
//     alertOpen: false,
//     deleteId: "",
//     rowsPerPage: 5,
//     page: 0,
//     checkSales: false,
//     users: []
//   };

//   handleSalesChange = name => event => {
//     this.setState({
//       [name]: event.target.checked
//     });
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
//       alertOpen: (this.state.alertOpen = true),
//       deleteId: id
//     });
//   };

//   handleClose = () => {
//     console.log(this.props);
//     this.setState({
//       alertOpen: (this.state.alertOpen = false)
//     });
//   };

//   handleDelete = () => {
//     console.log(this.props);
//     let id = this.state.deleteId;
//     axios.delete(`/api/products/${id}`).then(() => {
//       this.setState({
//         deleteId: ""
//       });
//       this.handleClose();
//       this.props.history.push("/dashboard");
//     });
//   };

//   render() {
//     // TODO: filter products with seller id and session user id
//     let ownerSalesData = this.context.state.products.filter(product => {
//       return product.seller;
//     });

//     // let requesterFiltered = [];

//     // ownerSalesData.map(product => {
//     //   product.requested.map(userId => {
//     //     requesterFiltered.push(
//     //       this.state.user.filter(user => {
//     //         return userId === user._id;
//     //       })
//     //     );
//     //   });
//     // });

//     // console.log(requesterFiltered);
//     // console.log("product", ownerSalesData);

//     console.log("user state", this.state.users);

//     <UserContext.Consumer>
//       {context => {
//         this.setState({
//           users: context.state.users
//         });
//       }}
//     </UserContext.Consumer>;

//     return (
//       <>
//         <h1 style={{ textAlign: "center" }}>Your products</h1>
//         <Paper>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Price</TableCell>
//                 <TableCell>Requester</TableCell>
//                 <TableCell>Contact</TableCell>
//                 <TableCell>Sales</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {ownerSalesData
//                 .slice(
//                   this.state.page * this.state.rowsPerPage,
//                   this.state.page * this.state.rowsPerPage +
//                     this.state.rowsPerPage
//                 )
//                 .map(product => {
//                   console.log(product.requested);
//                   return (
//                     <>
//                       <TableRow>
//                         <TableCell rowSpan={2}>{product.title}</TableCell>
//                         <TableCell rowSpan={2}>{product.price}</TableCell>
//                         {this.state.users.map(user => {
//                           user._id === product.requested[0] ? (
//                             <>
//                               <TableCell>
//                                 {user.firstName} {user.lastName}
//                               </TableCell>
//                               <TableCell>{user.email}</TableCell>
//                             </>
//                           ) : null;
//                         })}
//                         <TableCell>
//                           <Checkbox
//                             checked={this.state.checkSales}
//                             onChange={this.handleSalesChange("checkSales")}
//                             value="checkSale"
//                             inputProps={{
//                               "aria-label": "sales checkbox"
//                             }}
//                           />
//                         </TableCell>
//                       </TableRow>
//                       {product.requested.length > 1
//                         ? product.requested.map(userId => {
//                             return (
//                               <TableRow>
//                                 <TableCell>
//                                   {user.firstName} {user.lastName}
//                                 </TableCell>
//                                 <TableCell>{user.email}</TableCell>
//                                 <TableCell>
//                                   <Checkbox
//                                     checked={this.state.checkSales}
//                                     onChange={this.handleSalesChange(
//                                       "checkSales"
//                                     )}
//                                     value="checkSale"
//                                     inputProps={{
//                                       "aria-label": "sales checkbox"
//                                     }}
//                                   />
//                                 </TableCell>
//                               </TableRow>
//                             );
//                           })
//                         : null}
//                     </>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={ownerSalesData.length}
//             rowsPerPage={this.state.rowsPerPage}
//             page={this.state.page}
//             backIconButtonProps={{
//               "aria-label": "previous page"
//             }}
//             nextIconButtonProps={{
//               "aria-label": "next page"
//             }}
//             onChangePage={this.handleChangePage}
//             onChangeRowsPerPage={this.handleChangeRowsPerPage}
//           />
//         </Paper>
//         <Dialog
//           open={this.state.alertOpen}
//           onClose={this.handleClose}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">
//             {"Are you sure you want to delete this product?"}
//           </DialogTitle>
//           <DialogActions>
//             <Button onClick={this.handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={this.handleDelete} color="primary" autoFocus>
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </>
//     );
//   }
// }

// export default withRouter(DashSellerRequests);
