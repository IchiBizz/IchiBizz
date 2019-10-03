import React, { Component } from "react";
import AddProduct from "./components/AddProduct";
import "./App.css";
import Product from "./components/Product";

export default class App extends Component {
  render() {
    return (
      <div>
        <AddProduct />
      </div>
    );
  }
}
