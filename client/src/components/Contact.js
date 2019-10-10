import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, FormControl } from "@material-ui/core";

export default class Contact extends Component {
  state = {
    sellerEmail: this.props.sellerEmail, // from prodcutdateil//from useremail
    title: this.props.title, // from prodcutsdetail//swiching to product id
    subject: "",
    message: ""
  };

  // eventhandler
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //submit to send email
  handleSubmit = event => {
    event.preventDefault();
    const contactObj = {
      sellerEmail: this.state.sellerEmail, // from prodcutdateil//from useremail
      title: this.state.title, // from prodcutsdetail//swiching to product id
      userEmail: this.state.userEmail,
      subject: this.state.subject,
      message: this.state.message
    };
    console.log("hi");
    window.open("mailto:" + "this.state.subject", "_self");
  };

  render() {
    return (
      <FormControl onSubmit={this.handleSubmit}>
        <h2>contact form</h2>

        <Button
          type="contact to the seller"
          variant="outlined"
          onClick={this.handleSubmit}
          noValidate
        >
          send email to the seller
        </Button>
      </FormControl>
    );
  }
}
