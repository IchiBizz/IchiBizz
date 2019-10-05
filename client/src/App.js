import React, { Component } from "react";
import AddProduct from "./components/AddProduct";
import ProductsList from "./components/ProductsList";
import { Route } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/products" component={ProductsList} />
        <AddProduct />
      </div>
    );
  }
}