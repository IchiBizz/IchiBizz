import React, { Component } from "react";
import AddProduct from "./components/AddProduct";
import ProductsList from "./components/ProductsList";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Logout from "./components/Logout";

import { Route } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/productslist" component={ProductsList} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
      </div>
    );
  }
}
