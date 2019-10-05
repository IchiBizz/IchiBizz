import React from "react";
import "./App.css";
import ProductsList from "./components/ProductsList";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

import { Route } from "react-router-dom";
import LogIn from "./components/Login";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={SignUp} />
      <Route exact path="/" component={Login} />
    </div>
  );
}

export default App;
