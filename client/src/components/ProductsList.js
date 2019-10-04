import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchFilter from "./SearchFilter";

import { makeStyles } from "@material-ui/core/styles";
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
  Card
} from "@material-ui/core";

export default class ProductsList extends Component {
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

  handleChange = (event, newValue) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      priceValue: newValue
    });
    console.log(this.state.searchCategory);
    console.log(this.state.searchText);
    console.log(this.state.priceValue);
  };

  render() {
    const useStyles = makeStyles(theme => ({
      card: {
        maxWidth: 100
      }
    }));

    const classes = useStyles;

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
          return Boolean(
            tag.toLowerCase().includes(this.state.searchText.toLowerCase())
          );
        });

      let categoryMatched = product.category
        .toLowerCase()
        .includes(this.state.searchCategory.toLowerCase());

      let priceMatched =
        product.price >= this.state.priceValue[0] &&
        product.price <= this.state.priceValue[1];
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
        />

        <Grid container direction="row" justify="center" alignItems="center">
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
        </Grid>
      </>
    );
  }
}
