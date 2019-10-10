import React, { Component } from "react";
import axios from "axios";

export const UserContext = React.createContext();

export default class UserContextProvider extends Component {
  state = {
    users: []
  };

  getUserData = () => {
    axios
      .get("/api/users")
      .then(response => {
        console.log(response);
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount = () => {
    this.getUserData();
  };

  render() {
    console.log(this.state.users);
    return (
      <UserContext.Provider
        value={{ state: this.state, getUserData: this.getUserData }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
