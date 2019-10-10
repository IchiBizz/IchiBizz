import React, { Component } from "react";
import { logout } from "../services/api";
import axios from "axios";
import { Button } from "@material-ui/core";
import { SessionUserContext } from "../contexts/SessionUserContext";
import { withRouter } from "react-router";

class Logout extends Component {
  static contextType = SessionUserContext;

  handleLogout = event => {
    event.preventDefault();
    logout().then(() => {
      this.context.setUser(null);
      console.log(this.props);
      this.props.history.push("/");
    });
  };



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

export default withRouter(Logout);
