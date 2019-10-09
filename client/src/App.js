import React, { Component } from "react";
import ProductsList from "./components/products/ProductsList";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProductDetails from "./components/products/ProductDetails";
import AddProduct from "./components/products/AddProduct";
import DashboardContainer from "./components/dashboard/DashboardContainer";
import { Route, Redirect } from "react-router-dom";
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
      <div>
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
              <Protected
                exact
                path="/dashboard"
                user={this.state.user}
                component={DashboardContainer}
              />
              <Protected
                exact
                path="/products"
                user={this.state.user}
                component={ProductsList}
              />
              <Protected
                exact
                path="/products/:id"
                user={this.state.user}
                component={ProductDetails}
              />
              <Protected
                exact
                path="/products/new"
                user={this.state.user}
                component={AddProduct}
              />
            </UserContextProvider>
          </ProductProvider>
        </SessionUserProvider>
      </div>
    );
  }
}
