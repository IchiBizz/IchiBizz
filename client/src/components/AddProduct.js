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
    imageUrl: "",
    brand: "",
    category: [],
    price: 0,
    currency: "",
    pickupLocation: [],
    availability: new Date(),
    warrantyPeriod: 0,
    quantity: 0,
    status: ""
  };

  handleSubmit = event => {
    event.preventDefault();
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
        this.setState({
          name: "",
          description: "",
          imageUrl: "",
          brand: "",
          category: [],
          price: 0,
          currency: "",
          pickupLocation: [],
          availability: "",
          warrantyPeriod: 0,
          quantity: 0,
          status: ""
        });
        this.props.getData();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDateChange = date => {
    this.setState({
      availability: date
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log("name:", this.state.name);
  };

  handleImageChange = event => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageUrl: file
      });
    };

    reader.readAsDataURL(file);
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
      <div className="addProduct">
        <FormControl onSubmit={this.handleSubmit}>
          <TextField
            id="outlined-name-input"
            label="name"
            className={classes.textField}
            type="text"
            name="name"
            autoComplete="name"
            margin="normal"
            variant="outlined"
            value={this.state.name}
            onChange={this.handleChange}
          />
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
          <TextField
            id="outlined-price-input"
            label="price"
            className={classes.textField}
            type="number"
            name="price"
            autoComplete="price"
            margin="normal"
            variant="outlined"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <Select
            value={this.state.currencey}
            // onChange={}
            // labelWidth={labelWidth}
            inputProps={{
              name: "currencey",
              id: "outlined-currencey-simple"
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>$</MenuItem>
            <MenuItem value={20}>€</MenuItem>
            <MenuItem value={30}>£</MenuItem>
          </Select>
          {/* <TextField
            id="outlined-availability-input"
            label="availability"
            className={classes.textField}
            type="number"
            name="availability"
            autoComplete="availability"
            margin="normal"
            variant="outlined"
            value={this.state.availability}
            onChange={this.handleChange}
          /> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                name="availability"
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={this.state.availability}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <TextField
            id="outlined-warrantyPeriod-input"
            label="warrantyPeriod(year)"
            className={classes.textField}
            type="number"
            name="warrantyPeriod"
            autoComplete="warrantyPeriod"
            margin="normal"
            variant="outlined"
            value={this.state.warrantyPeriod}
            onChange={this.handleChange}
          />
          <TextField
            id="outlined-quantity-input"
            label="quantity"
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
          <TextField
            id="outlined-imageUrl"
            label="imageUrl"
            imageUrl
            className={classes.textField}
            type="file"
            name="imageUrl"
            accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png"
            margin="normal"
            value={this.state.imageUrl}
            onChange={this.handleImageChange}
          />
          <p></p>
          category: [google vision?]
          <p></p>location
          <Button type="submit" variant="outlined" className={classes.button}>
            create
          </Button>
        </FormControl>
      </div>
    );
  }
}
