import React, { Component } from "react";
import ProductsList from "./components/products/ProductsList";
import ProductDetails from "./components/products/ProductDetails";
import AddProduct from "./components/products/AddProduct";
import DashboardContainer from "./components/dashboard/DashboardContainer";
import ProductContextProvider from "./contexts/ProductContext";
import { Route, Redirect } from "react-router-dom";
import "./App.css";
import { LoggedInUserContext } from "./contexts/LoggedInUserContext";
import UserContextProvider from "./contexts/UserContext";

export default class App extends Component {
  static contextType = LoggedInUserContext;
  render() {
    return (
      <div>
        <UserContextProvider>
          <ProductContextProvider>
            <Route exact path="/dashboard" component={DashboardContainer} />
            <Route exact path="/products" component={ProductsList} />
          </ProductContextProvider>
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route exact path="/products/new" component={AddProduct} />
        </UserContextProvider>

        {/* TODO: Setup protected routes */}
        {/* <ProductContextProvider>
          <Route
            exact
            path="/dashboard"
            render={props => {
              if (this.context.state.user)
                return <DashboardContainer {...props} />;
              else return <Redirect to="/" />;
            }}
          />
          <Route
            exact
            path="/products"
            render={props => {
              if (this.context.state.user) return <ProductsList {...props} />;
              else return <Redirect to="/" />;
            }}
          />
        </ProductContextProvider>
        <Route
          exact
          path="/products/:id"
          render={props => {
            if (this.context.state.user) return <ProductDetails {...props} />;
            else return <Redirect to="/" />;
          }}
        />
        <Route
          exact
          path="/products/new"
          render={props => {
            if (this.context.state.user) return <AddProduct {...props} />;
            else return <Redirect to="/" />;
          }}
        /> */}
      </div>
    );
  }
}
