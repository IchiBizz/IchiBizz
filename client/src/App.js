import React, { Component } from "react";
import AddProduct from "./components/products/AddProduct";
import ProductsList from "./components/products/ProductsList";
import { Route } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/products/add" component={AddProduct} />
      </div>
    );
  }
}
