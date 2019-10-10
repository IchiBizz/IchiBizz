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
      <div className="App">
        <video id="bgVideo" loop autoPlay>
          <source
            src="https://storage.coverr.co/videos/Big-City-Life?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTcwNzAxNjI0fQ.v6u1pHcxWVoP-cfZp6xOFozFodMHrua3E5SzF9fcTr0"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="main">
          <div className="contents_inner">
            <div id="titleimg">
              <img src="../../logo1.png" alt="logo" />
            </div>
            <h2>i need small text here</h2>
          </div>
          <section className="loginbox">
            <div className="logincontainer">
              <SignUp />
              <Login />
            </div>
          </section>
        </div>
      </div>

      // <div className="userPage">
      //   <Navbar />
      //   <Switch>
      //     <div className="wrapper">
      //       <Route exact path="/products" component={ProductsList} />

      //       <Route exact path="/products/new" component={AddProduct} />

      //       <Route exact path="/contact" component={Contact} />
      //       <Route exact path="/product" component={Product} />
      //       <Route exact path="/products/:id" component={ProductDetails} />
      //     </div>
      //   </Switch>
      // </div>
    );
  }
}
