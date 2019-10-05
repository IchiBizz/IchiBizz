import React, { Component } from "react";
import Styles from "./Styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";

export default class SignUp extends Component {
  state = {
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

  render() {
    const { classes } = this.props;

    return (
      <FormControl variant="outlined">
        <TextField
          label="username"
          id="outlined-username-input"
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
          id="outlined-email-input"
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
          id="outlined-password-input"
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
          submit
        </Button>
      </FormControl>
    );
  }
}
