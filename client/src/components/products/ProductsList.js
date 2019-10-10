import React, { Component, useState, useContext } from "react";
import { Link } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import { ProductContext } from "../../contexts/ProductContext";
import { SessionUserContext } from "../../contexts/SessionUserContext";
import GoogleMapsProductsList from "./GoogleMapsProductsList";
import axios from "axios";

import useStyles from "./ProductListStyles";
import {
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  Card,
  FormControlLabel,
  Checkbox,
  withStyles
} from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

const ProductsList = props => {
  const { user } = useContext(SessionUserContext);

  const { products, updateProductData } = useContext(ProductContext);
  const [inputValues, setInputValues] = useState({
    searchText: "",
    searchCategory: "",
    searchBrand: "",
    searchCity: ""
  });
  const [priceValue, setPriceValue] = useState([20, 300]);
  const [selectedDate, setSelectedDate] = useState(
    new Date("December 31, 2019")
  );
  const [wishValue, setWishValue] = useState(false);

  const [checked, setChecked] = useState(false);

  let handleChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  let handlePriceChange = (event, newValue) => {
    setPriceValue(newValue);
  };

  let handleDateChange = date => {
    setSelectedDate(date);
  };

  let handleWishChange = event => {
    setWishValue(event.target.checked);
    let productId = event.target.value;
    if (event.target.checked) {
      axios.put(`/api/products/wish/add/${productId}`).then(response => {
        console.log(response.data);
        let updatedProducts = products.map(product => {
          if (product._id === response.data._id) return response.data;
          else return product;
        });
        updateProductData(updatedProducts);
      });
    } else {
      axios.put(`/api/products/wish/remove/${productId}`).then(response => {
        let updatedProducts = products.map(product => {
          if (product._id === response.data._id) return response.data;
          else return product;
        });
        updateProductData(updatedProducts);
      });
    }
  };

  // the distinctCategory variable is created to populate the category dropdown

  // render() {
  //   const { classes } = this.props;

  const classes = useStyles();

  // the distinctCategory variable is created to populate the category dropdown
  const distinctCategory = [
    ...new Set(
      products.map(product => {
        return product.category;
      })
    )
  ];

  const handleMapChange = event => {
    setChecked(event.target.checked);
  };

  // the distinctCategory variable is created to populate the category dropdown

  const distinctBrand = [
    ...new Set(
      products.map(product => {
        return product.brand;
      })
    )
  ];

  const distinctCity = [
    ...new Set(
      products.map(product => {
        return product.location && product.location.city;
      })
    )
  ];

  // const maxPrice = Math.max(
  //   ...products.map(product => {
  //     return product.price;
  //   })
  // );

  let filteredProduct = products.filter(product => {
    let isSoldMatch = product.isSold === false;

    let searchMatched =
      product.title
        .toLowerCase()
        .includes(inputValues.searchText.toLowerCase()) ||
      product.tags.find(tag => {
        return tag.toLowerCase().includes(inputValues.searchText.toLowerCase());
      });

    let categoryMatched = product.category
      .toLowerCase()
      .includes(inputValues.searchCategory.toLowerCase());

    let priceMatched =
      product.price >= priceValue[0] && product.price <= priceValue[1];

    // Date.parse converts the date string into milliseconds
    let dateMatched =
      Date.parse(product.availability) <= Date.parse(selectedDate);

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
        searchText={inputValues.searchText}
        searchCategory={inputValues.searchCategory}
        searchBrand={inputValues.searchBrand}
        searchCity={inputValues.searchCity}
        priceValue={priceValue}
        selectedDate={selectedDate}
        handleChange={handleChange}
        distinctCategory={distinctCategory}
        distinctBrand={distinctBrand}
        distinctCity={distinctCity}
        // maxPrice={maxPrice}

        handleDateChange={handleDateChange}
        handlePriceChange={handlePriceChange}
      />

      <FormControlLabel
        control={
          <Switch name="switch" checked={checked} onChange={handleMapChange} />
        }
        label="check the map"
      />
      <div className={classes.container}>
        <Fade in={checked}>
          <Paper elevation={4} className={classes.paper}>
            <GoogleMapsProductsList filteredProduct={filteredProduct} />
          </Paper>
        </Fade>
      </div>

      <div
        className={classes.mapListContainer}
        style={{ borderStyle: "solid", borderColor: "red" }}
      >
        <div>
          {filteredProduct.map(product => {
            return (
              <>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={product.title}
                      height="140"
                      image={`${product.imageUrl[0]}`}
                      title={product.title}
                    />
                    <CardContent>
                      <Link to={`/products/${product._id}`}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.title}
                        </Typography>
                      </Link>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {product.description} <br />
                        {product.currency} {product.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value={product._id}
                          checked={product.wishlist.some(
                            wishlist => wishlist._id === user._id
                          )}
                          onChange={handleWishChange}
                        />
                      }
                      label="Add to Wishlist"
                    />
                  </CardActions>
                  {console.log(
                    product.wishlist.some(
                      wishlist => wishlist._id === user._id
                    ),
                    product.wishlist,
                    user._id
                  )}
                  {/* <CardActions>
                      <Button size="small" color="primary">
                        Add to wishlist
                      </Button>
                    </CardActions> */}
                </Card>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(ProductsList);
