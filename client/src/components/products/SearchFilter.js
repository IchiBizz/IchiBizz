import React, { Component } from "react";
import {
  Slider,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  withStyles
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import useStyles from "./../SearchFilterStyles";
import "./../../App.css";

class SearchFilter extends Component {
  render() {
    const classes = useStyles;
    return (
      <>
        <TextField
          label="search"
          id="outlined-name-input"
          type="search"
          margin="normal"
          className={classes.textField}
          name="searchText"
          variant="outlined"
          autoComplete="search"
          value={this.props.searchText}
          onChange={this.props.handleChange}
        />
        <div className="filterContainer">
          {/* <div className={classes.filterContainer}> */}
          <div>
            <InputLabel htmlFor="outlined-age-simple">Category</InputLabel>
            <Select
              value={this.props.searchCategory}
              onChange={this.props.handleChange}
              inputProps={{
                name: "searchCategory",
                id: "searchCategory"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.distinctCategory.map(category => {
                return <MenuItem value={category}>{category}</MenuItem>;
              })}
            </Select>
          </div>
          <div>
            <InputLabel htmlFor="outlined-age-simple">Brand name</InputLabel>
            <Select
              value={this.props.searchBrand}
              onChange={this.props.handleChange}
              inputProps={{
                name: "searchBrand",
                id: "searchBrand"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.distinctBrand.map(brand => {
                return <MenuItem value={brand}>{brand}</MenuItem>;
              })}
            </Select>
          </div>

          <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
              Price range
            </Typography>
            <Slider
              name="priceValue"
              value={this.props.priceValue}
              onChange={this.props.handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              max={20000}
              // getAriaValueText={valuetext}
            />
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Filter by availability"
                  name="selectedDate"
                  value={this.props.selectedDate}
                  onChange={this.props.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(useStyles)(SearchFilter);
