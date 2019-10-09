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
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Select,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import GoogleMapsInput from "./GoogleMapsInput";
import { SessionUserContext } from "../../contexts/SessionUserContext";

export default class AddProduct extends Component {
  static contextType = SessionUserContext;

  state = {
    title: "",
    description: "",
    imageUrl: [],
    brand: "",
    category: "",
    quantity: 0,
    price: 0,
    currency: "EUR",
    tags: [],
    company: "",
    location: {
      latitude: 52.52,
      longitude: 13.405,
      city: "",
      address: "",
      country: ""
    },
    markerPosition: {
      lat: 52.52,
      lng: 13.405
    },
    availability: null,
    warrantyUntil: null,
    condition: "",
    createdAt: null,
    seller: this.context.user._id
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      // GET api/products/new to map with defined route in GET method of '/products/ProductDetails.js`
      .post("/api/products/new", {
        title: this.state.title,
        description: this.state.description,
        // FIXME: image Upload
        imageUrl: this.state.imageUrl,
        brand: this.state.brand,
        tags: this.state.tags,
        category: this.state.category,
        quantity: this.state.quantity,
        price: this.state.price,
        currency: this.state.currency,
        company: this.state.company,
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        city: this.state.location.city,
        address: this.state.location.address,
        country: this.state.location.country,
        availability: this.state.availability,
        warrantyUntil: this.state.warrantyUntil,
        condition: this.state.condition,
        createdAt: this.state.created_at,
        seller: this.state.seller
      })
      .then(response => {
        console.log("[AddProduct.js] handleSubmit event starting...");
        console.log("latitude", this.state.location.latitude);
        this.setState({
          title: "",
          description: "",
          imageUrl: [],
          brand: "",
          category: "",
          quantity: 0,
          price: 0,
          currency: "EUR",
          tags: [],
          company: "",
          location: {
            latitude: null,
            longitude: null,
            city: "",
            address: "",
            country: ""
          },
          availability: null,
          warrantyUntil: null,
          condition: "",
          createdAt: null,
          seller: this.context.user._id
        });
        console.log(`[AddProduct.js] response.data:`, response.data);
        // FIXME: this.props.getData() is not a function
        // this.getData();
      })
      .catch(err => {
        console.log(`[AddProduct.js]: response data`, err);
      });
  };

  //catching the date for availability
  handleDateChange = date => {
    this.setState({
      availability: date
    });
    console.log("availability:", date);
  };

  //catching the date for warranty until
  handleDateChangeWarrantyUntil = date => {
    this.setState({
      warrantyUntil: date
    });
    console.log("warrantyUntil:", date);
  };

  // eventhandler
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log("handleChange event.target.value", event.target.value);
  };

  //image upload
  imageHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      // TODO: Render all images later, not only first one
      imageUrl: [...this.state.imageUrl, event.target.files[0].name]
    });
  };

  getMapData = (address, country, city, lat, lng) => {
    this.setState({
      location: {
        latitude: lat,
        longitude: lng,
        city: city,
        address: address,
        country: country
      },
      markerPosition: {
        lat: lat,
        lng: lng
      }
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
      <>
        <FormControl onSubmit={this.handleSubmit}>
          {/* Title */}
          <TextField
            required
            id="outlined-title-input"
            label="Title"
            className={classes.textField}
            type="text"
            name="title"
            placeholder="e.g. Nestlé D1234 Coffee Maker"
            autoComplete="title"
            margin="normal"
            variant="outlined"
            value={this.state.title}
            onChange={this.handleChange}
          />
          {/* Description */}
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
            placeholder="e.g. Apple"
            autoComplete="brand"
            margin="normal"
            variant="outlined"
            value={this.state.brand}
            onChange={this.handleChange}
          />
          {/* {Category} */}
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-category-simple">Category</InputLabel>
            <Select
              value={this.state.category}
              onChange={this.handleChange}
              inputProps={{
                name: "category",
                id: "outlined-category-simple"
              }}
            >
              <MenuItem value="Category">
                <em>Select...</em>
              </MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Textile"}>Textile</MenuItem>
              <MenuItem value={"Energy"}>Energy</MenuItem>
              <MenuItem value={"Architecture"}>Architecture</MenuItem>
              <MenuItem value={"Woodwork"}>Woodwork</MenuItem>
              <MenuItem value={"Art"}>Art</MenuItem>
              <MenuItem value={"Economics"}>Economics</MenuItem>
              <MenuItem value={"Science"}>Science</MenuItem>
              <MenuItem value={"Education"}>Education</MenuItem>
              <MenuItem value={"Manufactory"}>Manufactory</MenuItem>
            </Select>
          </FormControl>
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
            id="outlined-adornment-price"
            label="Price"
            className={classes.textField}
            type="number"
            name="price"
            margin="normal"
            variant="outlined"
            value={this.state.price}
            onChange={this.handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">EUR</InputAdornment>
              )
            }}
          />
          {/* Company */}
          <TextField
            id="outlined-company-input"
            label="Company Name"
            className={classes.textField}
            type="text"
            name="company"
            placeholder="IchiBizz Inc"
            autoComplete="company"
            margin="normal"
            variant="outlined"
            value={this.state.company}
            onChange={this.handleChange}
          />
          {/* Location (read-only) this is populated from the map*/}
          <TextField
            disabled
            id="outlined-location"
            label="Location"
            className={classes.textField}
            type="text"
            name="address"
            placeholder="e.g. Berlin"
            margin="normal"
            variant="outlined"
            value={this.state.location.address}
          />
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
                label="Warranty until"
                value={this.state.warrantyUntil}
                onChange={this.handleDateChangeWarrantyUntil}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          {/* Condition */}
          <FormControl
            required
            component="fieldset"
            className={classes.formControl}
          >
            <FormLabel component="legend">Condition</FormLabel>
            <RadioGroup
              aria-label="condition"
              name="condition"
              value={this.state.condition}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="used"
                control={<Radio />}
                label="used"
                name="condition"
              />
              <FormControlLabel
                value="new"
                control={<Radio />}
                label="new"
                name="condition"
              />
            </RadioGroup>
          </FormControl>
          {/* image Url */}
          <label htmlFor="imageUrl">Upload Image(s): </label>
          <input
            type="file"
            multiple
            id="imageUrl"
            name="imageUrl"
            // FIXME: value={this.state.imageUrl}
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
        {/* GoogleMaps for entering location */}
        <GoogleMapsInput
          google={this.props.google}
          center={{
            lat: 52.52,
            lng: 13.405
          }}
          height="300px"
          zoom={12}
          getMapData={this.getMapData}
          markerPosition={{
            lat: this.state.markerPosition.lat,
            lng: this.state.markerPosition.lng
          }}
          address={this.state.location.address}
          country={this.state.location.country}
          city={this.state.location.city}
          mapPosition={{
            lat: this.state.location.latitude,
            lng: this.state.location.longitude
          }}
        />
      </>
    );
  }
}
