import React, { Component } from "react";
import { logout } from "../services/api";
import axios from "axios";
import { Button } from "@material-ui/core";
export default class Logout extends Component {
  state = {
    user: ""
  };

  getLoggedin = () => {
    axios.get("/api/auth/loggedin").then(response => {
      const user = response.data;
      this.setState({
        user: user
      });
    });
  };

  handleLogout = event => {
    event.preventDefault();
    logout()
      .then(() => {
        this.setState({
          user: null
        });
      })
      .then(() => {
        this.props.history.push("/projects");
      });
  };

  componentDidMount() {
    this.getLoggedin();
  }

  render() {
    return (
      <>
        <Button variant="outlined" onClick={this.handleLogout}>
          logout
        </Button>
      </>
    );
  }
}
