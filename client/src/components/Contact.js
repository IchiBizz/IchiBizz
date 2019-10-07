import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, FormControl } from "@material-ui/core";

export default class Contact extends Component {
  state = {
    sellerEmail: this.props.sellerEmail, // from dateil
    userEmail: this.props.userEmail, //from useremail
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
      // sellerEmail: this.state.sellerEmail,
      userEmail: this.state.userEmail,
      subject: this.state.subject,
      message: this.state.message
    };
    console.log("hi");
    axios
      .post("http://localhost:5555/api/contacts", contactObj)
      .then(() => console.log("done"))
      .then(() =>
        this.setState({ userEemail: "", subject: "", message: "" }).catch(
          err => {
            console.log(err);
          }
        )
      );
  };

  render() {
    return (
      <FormControl onSubmit={this.handleSubmit}>
        <h2>contact form</h2>
        {/* email */}
        <TextField
          required
          id="outlined-useremail-input"
          label="useremail"
          type="useremail"
          name="useremail"
          placeholder="e.g. Apple"
          autoComplete="useremail"
          margin="normal"
          variant="outlined"
          value={this.state.email}
          onChange={e => this.handleChange(e)}
        />
        {/* subject */}
        <TextField
          required
          id="outlined-subject-input"
          label="subject"
          type="text"
          name="subject"
          placeholder="e.g. Apple"
          autoComplete="subject"
          margin="normal"
          variant="outlined"
          value={this.state.subject}
          onChange={e => this.handleChange(e)}
        />

        {/* message */}
        <TextField
          id="outlined-message-static"
          label="message"
          type="text"
          name="message"
          margin="normal"
          multiline
          fullWidth
          rows="4"
          variant="outlined"
          value={this.state.message}
          onChange={e => this.handleChange(e)}
        />

        <Button
          type="send"
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
