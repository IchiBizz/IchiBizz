import React, { Component } from "react";
import AddProduct from "./components/products/AddProduct";
import ProductsList from "./components/products/ProductsList";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Contact from "./components/Contact";
import { Route } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/contact" component={Contact} />
      </div>
    );
  }
}
