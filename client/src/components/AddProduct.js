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
    title: "",
    description: "",
    imageUrl: [],
    brand: "",
    category: "",
    quantity: 0,
    price: 0,
    currency: "",
    tags: [],
    company: "",
    location: {
      latitude: null,
      longitude: null
    },
    // Must be future date
    availability: new Date(),
    warrantyUntil: new Date(),
    condition: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("handlesubmit working");
    axios
      .post("/api/products", {
        title: this.state.title,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        brand: this.state.brand,
        category: this.state.category,
        quantity: this.state.quantity,
        price: this.state.price,
        currency: this.state.currency,
        company: this.state.company,
        location: {
          latitude: this.state.latitude,
          longitude: this.state.longitude
        },
        availability: this.state.availability,
        warrantyUntil: this.state.warrantyUntil,
        condition: this.state.condition,
        wishlist: this.state.wishlist,
        requested: this.state.requested
      })
      .then(response => {
        console.log("[AddProduct.js] handleSubmit Response ", response);
        this.setState({
          title: "",
          description: "",
          imageUrl: [],
          brand: "",
          category: [],
          quantity: 0,
          price: 0,
          currency: "",
          tags: [],
          company: "",
          location: {
            latitude: 0,
            longitude: 0
          },
          availability: "",
          warrantyUntil: " ",
          condition: ""
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(`[AddProduct.js]: response data`, err);
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
  handleDateChangeWarrantyUntil = date => {
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
      // TODO: Render all images later, not only first one
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
        {/* Title */}
        <TextField
          required
          id="outlined-name-input"
          label="Title"
          className={classes.textField}
          type="text"
          name="title"
          autoComplete="title"
          margin="normal"
          variant="outlined"
          value={this.state.title}
          onChange={this.handleChange}
        />
        {/* description */}
        <TextField
          id="outlined-description-input"
          label="Description"
          className={classes.textField}
          type="text"
          name="description"
          autoComplete="description"
          margin="normal"
          variant="outlined"
          value={this.state.description}
          onChange={this.handleChange}
        />
        {/* Brand */}
        <TextField
          id="outlined-brand-input"
          label="Brand"
          className={classes.textField}
          type="text"
          name="brand"
          autoComplete="brand"
          margin="normal"
          variant="outlined"
          value={this.state.brand}
          onChange={this.handleChange}
        />
          {/* Quantity */}
          <TextField
          required
          id="outlined-quantity-input"
          label="Quantity"
          className={classes.textField}
          type="number"
          name="quantity"
          autoComplete="quantity"
          margin="normal"
          variant="outlined"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        {/* Price */}
        <TextField
          required
          id="outlined-price-input"
          label="Price"
          className={classes.textField}
          type="number"
          name="price"
          autoComplete="price"
          margin="normal"
          variant="outlined"
          value={this.state.price}
          onChange={this.handleChange}
        />
        {/* Currency */}
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
            <em>Currency</em>
          </MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
        </Select>
        {/* Availability */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              name="availability"
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Availability Date"
              value={this.state.availability}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "Change Date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {/* Warranty Until */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              name="warrantyUntil"
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Warranty Date until (if any)"
              value={this.state.warrantyUntil}
              onChange={this.handleDateChangeWarrantyPeriod}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        {/* Condition */}
        <TextField
          id="outlined-status-input"
          label="Condition (e.g. used)"
          className={classes.textField}
          type="text"
          name="condition"
          autoComplete="condition"
          margin="normal"
          variant="outlined"
          value={this.state.condition}
          onChange={this.handleChange}
        />
        {/* image Url */}
        <label htmlFor="imageUrl">Upload Image(s): </label>
        <input
          type="file"
          multiple
          id="imageUrl"
          name="imageUrl"
          // value={this.state.imageUrl}
          onChange={this.imageHandler}
        />
        <br />
        {/* // FIXME: Decide tagging via Google Vision
        Category: [google vision?] */}
        <br />
        <Button
          type="submit"
          variant="outlined"
          className={classes.button}
          onClick={this.handleSubmit}
          noValidate
        >
          Create
        </Button>
      </FormControl>
    );
  }
}
