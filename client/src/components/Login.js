import React, { Component } from "react";
// import Styles from "./Styles";
import { login } from "../services/api";
import { TextField, FormControl, Button } from "@material-ui/core";
import { SessionUserContext } from "../contexts/SessionUserContext";
import { withRouter } from "react-router";

class Login extends Component {
  state = {
    password: "",
    email: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    console.log("email:", this.state.email);
    console.log("password:", this.state.password);
  };

  handleSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;
    console.log(this.state.password);
    login(email, password).then(data => {
      console.log("login?react?", data);
      /*  window.confirm(data.message); */
      if (data.message) {
        this.setState({
          password: "",
          email: ""
        });
      } else {
        console.log("haha", this.context);
        this.props.setUser(data);

        this.props.history.push("/dashboard");
      }
    });
  };

  render() {
    return (
      <div id="login">
        <FormControl variant="outlined">
          <TextField
            label="email"
            id="outlined-email-input-login"
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
            id="outlined-password-input-login"
            type="password"
            margin="normal"
            // className={classes.textField}
            name="password"
            variant="outlined"
            autoComplete="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <Button variant="outlined" onClick={this.handleSubmit}>
            LOG IN
          </Button>
        </FormControl>
      </div>
    );
  }
}

export default Login;
