import React, { Component } from "react";
import Home from "./components/Home";
import Error from "./components/Error";
import ProductsList from "./components/products/ProductsList";
import WebFont from "webfontloader";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import EditProduct from "./components/products/EditProduct";
import ProductDetails from "./components/products/ProductDetails";
import AddProduct from "./components/products/AddProduct";
import Product from "./components/products/User";

import { Route, Switch } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={Home} />

        <div className="userPage">
          <Navbar />
          <Switch>
            <div className="wrapper">
              <Route exact path="/products" component={ProductsList} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/products/:id" component={ProductDetails} />
              <Route exact path="/products/new" component={AddProduct} />
              <Route component={Error} />
            </div>
          </Switch>
        </div>
      </>
    );
  }
}
