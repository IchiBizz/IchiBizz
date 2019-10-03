import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Input } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import { TextField } from "@material-ui/core";

export default class ProductsList extends Component {
  state = {
    products: [],
    search: ""
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

  handleSearch = event => {
    const value = event.target.value;
    console.log(value);
    this.setState({
      search: value
    });
  };

  render() {
    const useStyles = makeStyles(theme => ({
      card: {
        maxWidth: 345
      }
    }));

    const classes = useStyles;

    const filteredProduct = this.state.products.filter(product => {
      return (
        product.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
        product.tags.find(tag => {
          console.log("tag: ", tag, "search: ", this.state.search);
          return Boolean(
            tag.toLowerCase().includes(this.state.search.toLowerCase())
          );
        })
      );
    });

    return (
      <>
        <h1>Product List</h1>
        <TextField
          label="search"
          id="outlined-name-input"
          type="search"
          margin="normal"
          className={classes.textField}
          name="search"
          variant="outlined"
          autoComplete="search"
          value={this.state.search}
          onChange={this.handleSearch}
        />
        {filteredProduct.map(data => {
          return (
            <>
              {/* <Carousel autoPlay>
                {data.imageUrl.map(image => {
                  console.log(image);
                  return (
                    <div>
                      <img src={image} alt={image} />
                    </div>
                  );
                })}
              </Carousel> */}
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
      </>
    );
  }
}
