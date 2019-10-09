import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchFilter from "./SearchFilter";

import GoogleMapsProductsList from "../GoogleMapsProductsList";

import useStyles from "./ProductListStyles";
import {
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  Card,
  withStyles
} from "@material-ui/core";

class ProductsList extends Component {
  state = {
    products: [],
    searchText: "",
    searchCategory: "",
    searchBrand: "",

    searchCity: "",

    priceValue: [20, 300],
    selectedDate: new Date("December 31, 2019")
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
    const { classes } = this.props;

    // the distinctCategory variable is created to populate the category dropdown
    const distinctCategory = [
      ...new Set(
        this.state.products.map(product => {
          return product.category;
        })
      )
    ];

    const distinctBrand = [
      ...new Set(
        this.state.products.map(product => {
          return product.brand;
        })
      )
    ];

    const distinctCity = [
      ...new Set(
        this.state.products.map(product => {
          return product.location && product.location.city;
        })
      )
    ];

    // const maxPrice = Math.max(
    //   ...this.state.products.map(product => {
    //     return product.price;
    //   })
    // );

    let filteredProduct = this.state.products.filter(product => {
      let isSoldMatch = product.isSold === false;

      let searchMatched =
        product.title
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

      let priceMatched =
        product.price >= this.state.priceValue[0] &&
        product.price <= this.state.priceValue[1];

      // Date.parse converts the date string into milliseconds
      let dateMatched =
        Date.parse(product.availability) <= Date.parse(this.state.selectedDate);

      return (
        isSoldMatch &&
        searchMatched &&
        categoryMatched &&
        priceMatched &&
        dateMatched
      );
    });

    return (
      <div className={classes.listPageContainer}>
        <h1>Product List</h1>
        <SearchFilter
          searchText={this.state.searchText}
          searchCategory={this.state.searchCategory}
          searchBrand={this.state.searchBrand}
          searchCity={this.state.searchCity}
          priceValue={this.state.priceValue}
          selectedDate={this.state.selectedDate}
          handleChange={this.handleChange}
          distinctCategory={distinctCategory}
          distinctBrand={distinctBrand}
          distinctCity={distinctCity}
          // maxPrice={maxPrice}

          handleDateChange={this.handleDateChange}
          handlePriceChange={this.handlePriceChange}
        />
        <GoogleMapsProductsList filteredProduct={filteredProduct} />

        <div className={classes.mapListContainer}>
          <div>
            {filteredProduct.map(data => {
              return (
                <>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={data.title}
                        height="140"
                        image={`${data.imageUrl[0]}`}
                        title={data.title}
                      />
                      <CardContent>
                        <Link to={`/products/${data._id}`}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {data.title}
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
                        Add to wishlist
                      </Button>
                    </CardActions>
                  </Card>
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(ProductsList);
