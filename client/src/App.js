import React, { Component } from "react";
import ProductsList from "./components/products/ProductsList";
import WebFont from "webfontloader";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

import ProductDetails from "./components/products/ProductDetails";
import AddProduct from "./components/products/AddProduct";
import Product from "./components/products/User";

import { Route, Switch } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  // setUser = user => {
  //   this.setState({
  //     user: user
  //   });
  // };

  render() {
    return (
      // {user ? (

      <div className="App">
        <video id="bgVideo" loop autoPlay>
          <source
            src="https://storage.coverr.co/videos/coverr-basel-overview-1567677321016?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTcwNjI1MDAxfQ.1zi6LtQBomwYbISEzHE0pUOxJ1b2CFblXsaAFiCEago"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <main>
          <div className="contents_inner">
            <h1>ichbizz</h1> <br />
            <h2>to get their business started</h2>
          </div>
          <section className="loginbox">
            <div className="logincontainer">
              <SignUp />
              <Login />
            </div>
          </section>
        </main>
      </div>
      // ) : (

      //    <div className="userPage">
      // <div className="wrapper">
      //   <Navbar />
      //   <Switch>
      //   <Route exact path="/products" component={ProductsList} />
      //     <Route exact path="/contact" component={Contact} />
      //     <Route exact path="/product" component={Product} />
      //     <Route exact path="/products/:id" component={ProductDetails} />
      //     <Route exact path="/products/new" component={AddProduct} />
      //   </Switch>
      //   </div>
      // </div>
      //  )}
    );
  }
}
