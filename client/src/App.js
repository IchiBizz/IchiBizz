import React, { Component } from "react";
import ProductsList from "./components/products/ProductsList";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

import ProductDetails from "./components/products/ProductDetails";
import AddProduct from "./components/products/AddProduct";

import { Route, Switch } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/navbar" component={Navbar} />
        <Switch>
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route exact path="/products/new" component={AddProduct} />
          <Route exact path="/products" component={ProductsList} />
        </Switch>

        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}
