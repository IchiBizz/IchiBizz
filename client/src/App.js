import React from "react";
import "./App.css";
import ProductsList from "./components/ProductsList";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/products" component={ProductsList} />
    </div>
  );
}

export default App;
