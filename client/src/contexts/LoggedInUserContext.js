import React, { Component } from "react";
import axios from "axios";

export const LoggedInUserContext = React.createContext();
export default class LoggedInUserContextProvider extends Component {
  state = {
    user: ""
  };

  getUserData = () => {
    axios.get("/api/auth/loggedin").then(response => {
      this.setState({
        user: response.data
      });
    });
  };

  componentDidMount = () => {
    this.getUserData();
  };

  render() {
    return (
      <LoggedInUserContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </LoggedInUserContext.Provider>
    );
  }
}
