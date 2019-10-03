import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchFilter from "./SearchFilter";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Carousel } from "react-responsive-carousel";
import { TextField, Grid, Box } from "@material-ui/core";

export default class ProductsList extends Component {
  state = {
    products: [],
    searchText: "",
    searchCategory: ""
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
    console.log(distinctCategory);

    const filteredProduct = this.state.products.filter(product => {
      let searchMatched =
        product.name
          .toLowerCase()
          .includes(this.state.searchText.toLowerCase()) ||
        product.tags.find(tag => {
          console.log("tag: ", tag, "search: ", this.state.searchText);
          return Boolean(
            tag.toLowerCase().includes(this.state.searchText.toLowerCase())
          );
        });

      let categoryMatched = product.category.includes(
        this.state.searchCategory.toLowerCase()
      );

      return searchMatched && categoryMatched;
    });

    return (
      <>
        <h1>Product List</h1>
        <SearchFilter
          searchText={this.state.searchText}
          searchCategory={this.state.searchCategory}
          handleChange={this.handleChange}
          filteredProduct={filteredProduct}
          distinctCategory={distinctCategory}
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
                        {data.description}
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
