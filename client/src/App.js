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

import DashboardContainer from "./components/dashboard/DashboardContainer";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import UserContextProvider from "./contexts/UserContext";
import Protected from "./Protected";
import { ProductProvider } from "./contexts/ProductContext";
import { SessionUserProvider } from "./contexts/SessionUserContext";

export default class App extends Component {
  state = {
    products: this.props.products,
    user: this.props.user
  };

  updateProductData = products => {
    this.setState({ products });
  };

  render() {
    return (
      <>
       <Route exact path="/" component={Home} />
       <div className="userPage">
        <Navbar />
         <div className="wrapper">
        <SessionUserProvider value={{ user: this.state.user }}>
          <ProductProvider
            value={{
              products: this.state.products,
              updateProductData: this.updateProductData
            }}
          >
            <Route
              exact
              path="/signup"
              user={this.state.user}
              component={SignUp}
            />
            <Route
              exact
              path="/login"
              user={this.state.user}
              component={Login}
            />
            <UserContextProvider>
              <Switch>
                <Protected
                  exact
                  path="/dashboard"
                  user={this.state.user}
                  component={DashboardContainer}
                />
                <Route
                  exact
                  path="/products"
                  user={this.state.user}
                  component={ProductsList}
                />
                <Protected
                  exact
                  path="/products/new"
                  user={this.state.user}
                  component={AddProduct}
                />
                <Route
                  exact
                  path="/products/:id"
                  user={this.state.user}
                  component={ProductDetails}
                />
                <Protected
                  exact
                  path="/products/edit/:id"
                  component={EditProduct}
                />
              <Route component={Error} />
              </Switch>
            </UserContextProvider>
          </ProductProvider>
        </SessionUserProvider>
        </div>
        </div>

      </>
    );
  }
}
