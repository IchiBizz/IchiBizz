import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Slider,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

export default class SearchFilter extends Component {
  render() {
    const useStyles = makeStyles(theme => ({
      card: {
        maxWidth: 100
      },
      root: {
        width: 300
      }
    }));
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
            max={this.props.maxPrice}
            // getAriaValueText={valuetext}
          />
        </div>

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
      </>
    );
  }
}
