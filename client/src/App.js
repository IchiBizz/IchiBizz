import React from "react";
import "./App.css";
import ProductsList from "./components/ProductsList";
import SignUp from "./components/SignUp";

import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={SignUp} />
    </div>
  );
}

export default App;
