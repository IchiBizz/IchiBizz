import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import GoogleMapsProductList from "./GoogleMapsProductList";
import useStyles from "./ProductListStyles";
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

class ProductsList extends Component {
  state = {
    products: [],
    searchText: "",
    searchCategory: "",
    searchBrand: "",
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

    const maxPrice = Math.max(
      ...this.state.products.map(product => {
        return product.price;
      })
    );

    let filteredProduct = this.state.products.filter(product => {
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

      return searchMatched && categoryMatched && priceMatched && dateMatched;
    });

    return (
      <div className={classes.listPageContainer}>
        <h1>Product List</h1>
        <SearchFilter
          searchText={this.state.searchText}
          searchCategory={this.state.searchCategory}
          searchBrand={this.state.searchBrand}
          priceValue={this.state.priceValue}
          selectedDate={this.state.selectedDate}
          handleChange={this.handleChange}
          distinctCategory={distinctCategory}
          distinctBrand={distinctBrand}
          maxPrice={maxPrice}
          handleDateChange={this.handleDateChange}
          handlePriceChange={this.handlePriceChange}
        />
        <div className={classes.mapListContainer}>
          <div>
            <GoogleMapsProductList filteredProduct={filteredProduct} />
          </div>

          <div>
            {filteredProduct.map(data => {
              console.log(data.location.latitude);
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
                    {/* the 'share' and 'learn more' links are placeholders for now */}
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
