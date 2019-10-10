import React, { Component } from "react";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import useStyles from "./ProductListStyles";
import { ProductContext } from "../../contexts/ProductContext";
import { SessionUserContext } from "../../contexts/SessionUserContext";
const { red } = require("@material-ui/core/colors");
const { withStyles } = require("@material-ui/core/styles");

class ProductDetails extends Component {
  static contextType = ProductContext;
  state = {
    title: "",
    description: "",
    imageUrl: [],
    brand: "",
    category: "",
    quantity: 0,
    price: 0,
    currency: "EUR",
    tags: [],
    company: "",
    location: {
      latitude: null,
      longitude: null
    },
    availability: null,
    warrantyUntil: null,
    condition: "",
    isSold: false,
    createdAt: null,
    _id: "",
    requested: []
  };

  getData = () => {
    const id = this.props.match.params.id;
    // console.log(`id`, id);

    axios
      .get(`/api/products/${id}`)
      .then(response => {
        // TODO @Ninette: latitude, longitude
        console.log("resopnse", response);

        this.setState({
          title: response.data.title,
          description: response.data.description,
          imageUrl: response.data.imageUrl,
          brand: response.data.brand,
          category: response.data.category,
          quantity: response.data.quantity,
          price: response.data.price,
          currency: response.data.currency,
          tags: response.data.currency,
          company: response.data.company,
          availability: response.data.availability,
          warrantyUntil: response.data.warrantyUntil,
          condition: response.data.condition,
          createdAt: response.data.createdAt,
          requested: response.data.requested,
          _id: response.data._id
        });
        // console.log(`GET this.state.response`, response.data)
      })
      .catch(err => {
        console.log(err);
      });
    // .catch(err => {
    //   console.log(`ERR`, err.response);
    //   if (err.response.status === 404) {
    //     this.setState({ error: "Not found" });
    //   }
    // });
  };

  componentDidMount = () => {
    this.getData();
  };

  handleClick = id => {
    console.log("handle id", id);
    axios.put(`api/products/request/${id}`).then(response => {
      console.log("request response", response);
      let updatedProducts = this.context.products.map(product => {
        if (id === response.data._id) return response.data;
        else return product;
      });
      this.context.updateProductData(updatedProducts);
    });
  };

  render() {
    // TODO 1: Implement Material UI Styles once we agreed on one style
    const {
      id,
      title,
      description,
      imageUrl,
      brand,
      category,
      quantity,
      price,
      currency,
      tags,
      company,
      availability,
      warrantyUntil,
      condition,
      isSold,
      createdAt,
      _id,
      requested
    } = this.state;

    //  console.log(`imageUrl`, imageUrl);

    console.log("requested", requested, "title", title);

    return (
      <>
        {/* <h1>Product Details Page</h1> */}
        <div className="productDetailImg" style={{ margin: "3% 0" }}>
          <div style={{ margin: "0 25%" }}>
            {// TODO: Provide a unique key
            imageUrl &&
              imageUrl.map(img => {
                return (
                  <img
                    src={img}
                    alt="business img"
                    style={{ height: "200px", margin: "2%" }}
                  />
                );
              })}
          </div>
          <Card style={{ width: "50%", margin: "0 25%" }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
              <Typography color="textSecondary">{brand}</Typography>
              <Typography variant="body2" component="p">
                {description}
              </Typography>
              <Typography variant="body2" component="p">
                Quantity: {quantity}
              </Typography>
              <Typography variant="body2" component="p">
                Price:{price}
              </Typography>
              <Typography variant="body2" component="p">
                Category:{category}
              </Typography>
              <Typography variant="body2" component="p">
                Tags:{tags}
              </Typography>
              <Typography variant="body2" component="p">
                Company: {company}
              </Typography>
              <Typography variant="body2" component="p">
                Availability: {availability}
              </Typography>
              <Typography variant="body2" component="p">
                Warranty until: {warrantyUntil}
              </Typography>
              <Typography variant="body2" component="p">
                Condition: {condition}
              </Typography>
            </CardContent>
          </Card>

          <div>
            {/* // TODO: Only seller should see `isSold` */}
            {isSold}
            {createdAt}
          </div>
          {/* <p>
            Send request to seller and he or she will be able to view your email
            address to contact you
          </p> */}
          {
            <SessionUserContext.Consumer>
              {contextUser => {
                console.log("requested", requested);
                console.log("id", _id);
                console.log("session user id", contextUser);

                return requested.some(user => user === contextUser.user._id) ? (
                  <Button
                    style={{ margin: "0 43%" }}
                    variant="contained"
                    color="primary"
                    disabled
                  >
                    Request Sent
                  </Button>
                ) : (
                  <Button
                    style={{ margin: "0 43%" }}
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleClick(_id)}
                  >
                    Send Request
                  </Button>
                );
              }}
            </SessionUserContext.Consumer>
          }
        </div>
      </>
    );
  }
}

export default ProductDetails;
