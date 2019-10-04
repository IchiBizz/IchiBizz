import React, { Component } from "react";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Grid
} from "@material-ui/core";

export default class AddProduct extends Component {
  state = {
    name: "",
    description: "",
    imageUrl: [],
    category: "",
    price: 0,
    currency: "",
    pickupLocation: [],
    availability: new Date(),
    warrantyPeriod: new Date(),
    quantity: 0,
    status: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("handlesubmit working");
    axios
      .post("/api/products", {
        name: this.state.name,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        brand: this.state.brand,
        category: this.state.category,
        price: this.state.price,
        currency: this.state.currency,
        pickupLocation: this.state.pickupLocation,
        availability: this.state.availability,
        warrantyPeriod: this.state.warrantyPeriod,
        quantity: this.state.quantity,
        status: this.state.status
      })
      .then(response => {
        console.log("hereee", response);
        this.setState({
          name: "",
          description: "",
          imageUrl: [],
          brand: "",
          category: [],
          price: 0,
          currency: " ",
          pickupLocation: [],
          availability: "",
          warrantyPeriod: " ",
          quantity: 0,
          status: ""
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //catching da date for availability
  handleDateChange = date => {
    this.setState({
      availability: date
    });
    console.log("availability:", date);
  };

  //catching da date for warrantyPeriod
  handleDateChangeWarrentyPeriod = date => {
    this.setState({
      warrantyPeriod: date
    });
    console.log("warrantyperiod:", date);
  };

  // eventhandler
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    // console.log("currency", this.state.currency);
    // console.log("name", this.state.name);
  };

  //image upload
  imageHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      imageUrl: [...this.state.imageUrl, event.target.files[0].name]
    });
  };

  render() {
    const styling = makeStyles(theme => ({
      button: {
        margin: theme.spacing(1)
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
      },
      input: {
        display: "none"
      },
      dense: {
        marginTop: theme.spacing(2)
      },
      menu: {
        width: 200
      },
      root: {
        display: "flex",
        flexWrap: "wrap"
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120
      },
      selectEmpty: {
        marginTop: theme.spacing(2)
      }
    }));

    const classes = styling;
    return (
      <FormControl onSubmit={this.handleSubmit}>
        {/* name */}
        <TextField
          required
          id="outlined-name-input"
          label="name / required"
          className={classes.textField}
          type="text"
          name="name"
          autoComplete="name"
          margin="normal"
          variant="outlined"
          value={this.state.name}
          onChange={this.handleChange}
        />
        {/* description */}
        <TextField
          id="outlined-description-input"
          label="description"
          className={classes.textField}
          type="text"
          name="description"
          autoComplete="description"
          margin="normal"
          variant="outlined"
          value={this.state.description}
          onChange={this.handleChange}
        />
        {/* brannd */}
        <TextField
          id="outlined-brand-input"
          label="brand"
          className={classes.textField}
          type="text"
          name="brand"
          autoComplete="brand"
          margin="normal"
          variant="outlined"
          value={this.state.brand}
          onChange={this.handleChange}
        />
        {/* price */}
        <TextField
          required
          id="outlined-price-input"
          label="price required"
          className={classes.textField}
          type="number"
          name="price"
          autoComplete="price"
          margin="normal"
          variant="outlined"
          value={this.state.price}
          onChange={this.handleChange}
        />
        {/* currency */}
        <Select
          value={this.state.currency}
          onChange={this.handleChange}
          labelWidth={20}
          inputProps={{
            name: "currency",
            id: "outlined-currencey-simple"
          }}
          name="currency"
        >
          <MenuItem value="">
            <em>currency</em>
          </MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
        </Select>
        {/* availability */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              name="availability"
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="availability"
              value={this.state.availability}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {/* warrantyPeriod */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              name="warrantyPeriod"
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="warrantyPeriod"
              value={this.state.warrantyPeriod}
              onChange={this.handleDateChangeWarrentyPeriod}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {/* quantity */}
        <TextField
          required
          id="outlined-quantity-input"
          label="quantity required"
          className={classes.textField}
          type="number"
          name="quantity"
          autoComplete="quantity"
          margin="normal"
          variant="outlined"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        <TextField
          id="outlined-status-input"
          label="status"
          className={classes.textField}
          type="text"
          name="status"
          autoComplete="status"
          margin="normal"
          variant="outlined"
          value={this.state.status}
          onChange={this.handleChange}
        />
        {/* image Url */}
        <label htmlFor="imageUrl">upload images</label>
        <input
          type="file"
          multiple
          id="imageUrl"
          name="imageUrl"
          // value={this.state.imageUrl}
          onChange={this.imageHandler}
        />
        <p></p>
        category: [google vision?]
        <p></p>location
        <Button
          type="submit"
          variant="outlined"
          className={classes.button}
          onClick={this.handleSubmit}
          noValidate
        >
          create
        </Button>
      </FormControl>
    );
  }
}
