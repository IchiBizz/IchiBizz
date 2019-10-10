import React, { Component } from "react";
import { signup } from "../services/api";
import { TextField, FormControl, Button } from "@material-ui/core";

export default class SignUp extends Component {
  state = {
    message: "",
    password: "",
    username: "",
    email: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    // console.log("username:", this.state.username);
    // console.log("email:", this.state.email);
    // console.log("password:", this.state.password);
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, email, password } = this.state;
    console.log(this.state.username);
    signup(username, email, password).then(data => {
      console.log("signup?", data.message);
      window.confirm(data.message);
      if (data.message) {
        this.setState({
          message: data.message,
          password: "",
          username: "",
          email: ""
        });
      } else {
        // this.props.setUser(data);
        console.log(this.props.history);
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div id="signup">
        <FormControl variant="outlined">
          <TextField
            label="username"
            id="outlined-username-input-signup"
            type="text"
            margin="normal"
            // className={classes.textField}
            name="username"
            variant="outlined"
            autoComplete="username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <TextField
            label="email"
            id="outlined-email-input-signup"
            type="email"
            margin="normal"
            // className={classes.textField}
            name="email"
            variant="outlined"
            autoComplete="email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <TextField
            label="password / min. 8char"
            id="outlined-password-input-signup"
            type="password"
            margin="normal"
            // className={classes.textField}
            name="password"
            variant="outlined"
            autoComplete="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <label htmlFor="password">
            *password must contain
            <br />
            Capital letter and number
          </label>
          <Button variant="outlined" onClick={this.handleSubmit}>
            SIGN UP
          </Button>
        </FormControl>
      </div>
    );
  }
}
