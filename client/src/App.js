import React, { Component } from "react";
import ProductsList from "./components/products/ProductsList";
import ProductDetails from "./components/products/ProductDetails";
import AddProduct from "./components/products/AddProduct";
import DashboardContainer from "./components/dashboard/DashboardContainer";
import ProductContextProvider from "./contexts/ProductContext";
import { Route } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <ProductContextProvider>
          <Route exact path="/dashboard" component={DashboardContainer} />
          <Route exact path="/products" component={ProductsList} />
        </ProductContextProvider>
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route exact path="/products/new" component={AddProduct} />
      </div>
    );
  }
}
