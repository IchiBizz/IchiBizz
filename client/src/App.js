import React, { Component } from "react";
import ProductsList from "./components/products/ProductsList";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

import ProductDetails from "./components/products/ProductDetails";
import AddProduct from "./components/products/AddProduct";
import Product from "./components/products/User";

import { Route, Switch } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  //  state = {
  //   user: this.props.user
  // };

  // setUser = user => {
  //   this.setState({
  //     user: user
  //   });
  // };

 
  render() {
    return (
     

// {user ? (
        
      // <div className="App"> 
      //   <Route exact path="/signup" component={SignUp} />
      //   <Route exact path="/login" component={Login} />
      //  </div>
          // ) : (

         <div className="userPage">
      <div className="wrapper">
        <Navbar />
        <Switch>
        <Route exact path="/products" component={ProductsList} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/product" component={Product} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route exact path="/products/new" component={AddProduct} />
        </Switch>
        </div>
      </div>
        //  )}
    );
  }
}
