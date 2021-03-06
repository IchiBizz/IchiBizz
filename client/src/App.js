import React, { Component } from "react";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
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

  setUser = user => {
    this.setState({ user });
  };

  render() {
    return (
      <>
        <Route
          exact
          path="/"
          render={props => (
            <Home {...props} user={this.state.user} setUser={this.setUser} />
          )}
        />
        <div className="userPage">
          <SessionUserProvider
            value={{ user: this.state.user, setUser: this.setUser }}
          >
            <Navbar />
            <div className="wrapper">
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
                  render={props => (
                    <Login
                      user={this.state.user}
                      setUser={this.setUser}
                      {...props}
                    />
                  )}
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
                    <Route path="/404" component={ErrorPage} />
                  </Switch>
                </UserContextProvider>
              </ProductProvider>
            </div>
          </SessionUserProvider>
        </div>
      </>
    );
  }
}
