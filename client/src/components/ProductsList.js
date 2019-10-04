import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import useStyles from "./ProductStyles";

import { Carousel } from "react-responsive-carousel";
import {
  Typography,
  TextField,
  Grid,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  Card,
  withStyles
} from "@material-ui/core";

// const useStyles = theme => ({
//   card: {
//     maxWidth: 300,
//     margin: "0 auto"
//   }
// });

class ProductsList extends Component {
  state = {
    products: [],
    searchText: "",
    searchCategory: "",
    priceValue: [20, 50],
    selectedDate: ""
  };

  getData = () => {
    axios
      .get("/api/products")
      .then(response => {
        console.log(response);
        this.setState({
          products: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state.searchCategory);
    console.log(this.state.searchText);
    console.log(this.state.priceValue);
  };

  handlePriceChange = (event, newValue) => {
    this.setState({
      priceValue: newValue
    });
  };

  handleDateChange = date => {
    this.setState({
      selectedDate: date
    });
  };

  render() {
    console.log("price", this.state.priceValue);
    const { classes } = this.props;
    console.log(classes);
    const distinctCategory = [
      ...new Set(
        this.state.products.map(product => {
          return product.category;
        })
      )
    ];

    const maxPrice = Math.max(
      ...this.state.products.map(product => {
        return product.price;
      })
    );

    let filteredProduct = this.state.products.filter(product => {
      let searchMatched =
        product.name
          .toLowerCase()
          .includes(this.state.searchText.toLowerCase()) ||
        product.tags.find(tag => {
          return tag
            .toLowerCase()
            .includes(this.state.searchText.toLowerCase());
        });

      let categoryMatched = product.category
        .toLowerCase()
        .includes(this.state.searchCategory.toLowerCase());
      console.log("######", this.state.priceValue[0]);
      let priceMatched;
      if (product.price) {
        priceMatched =
          product.price >= this.state.priceValue[0] &&
          product.price <= this.state.priceValue[1];
      } else {
        priceMatched = true;
      }

      // let dateMatched = product.availability <= this.state.selectedDate;

      return searchMatched && categoryMatched && priceMatched;
    });

    return (
      <>
        <h1>Product List</h1>
        <SearchFilter
          searchText={this.state.searchText}
          searchCategory={this.state.searchCategory}
          priceValue={this.state.priceValue}
          handleChange={this.handleChange}
          filteredProduct={filteredProduct}
          distinctCategory={distinctCategory}
          maxPrice={maxPrice}
          handleDateChange={this.handleDateChange}
          handlePriceChange={this.handlePriceChange}
        />
        <div>
          {filteredProduct.map(data => {
            return (
              <>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={data.name}
                      height="140"
                      image={`${data.imageUrl[0]}`}
                      title={data.name}
                    />
                    <CardContent>
                      <Link to={`/products/${data._id}`}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {data.name}
                        </Typography>
                      </Link>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {data.description} <br />
                        {data.currency} {data.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </>
            );
          })}
        </div>
      </>
    );
  }
}

export default withStyles(useStyles)(ProductsList);
