import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";

axios
  .get("/api/auth/loggedin")
  .then(userResponse => {
    const user = userResponse.data;
    axios.get("/api/products").then(response => {
      ReactDOM.render(
        <BrowserRouter>
          <CssBaseline />
          <App products={response.data} user={user} />
        </BrowserRouter>,
        document.getElementById("root")
      );
    });
  })
  .catch(err => {
    console.log(err);
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
