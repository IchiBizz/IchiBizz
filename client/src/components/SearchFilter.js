import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, InputLabel, Select, MenuItem } from "@material-ui/core";

export default class SearchFilter extends Component {
  render() {
    const useStyles = makeStyles(theme => ({
      card: {
        maxWidth: 100
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
      </>
    );
  }
}
