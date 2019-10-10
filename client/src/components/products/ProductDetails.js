import React, { Component } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import useStyles from "./ProductListStyles";
import { ProductContext } from "../../contexts/ProductContext";
import { SessionUserContext } from "../../contexts/SessionUserContext";

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
    // console.log(`id`, id)

    axios
      .get(`/api/products/${id}`)
      .then(response => {
        // TODO @Ninette: latitude, longitude
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
          createdAt: response.data.createdAt
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

    return (
      <div>
        <h1>Product Details Page</h1>
        <React.Fragment>
          <div>
            {// TODO: Provide a unique key
            imageUrl &&
              imageUrl.map(img => {
                return (
                  <ul>
                    <li>
                      <img src={img} alt="business img" />
                    </li>
                  </ul>
                );
              })}
          </div>
          <h2>{title}</h2>
          <div>
            {description}
            {brand}
            {tags}
            {category}
            {quantity}
            {price}
            {currency}
            {company}
            {/* // TODO @Ninette: Add latitude, longitude */}
            {availability}
            {warrantyUntil}
            {condition}
            {/* // TODO: Only seller should see `isSold` */}
            {isSold}
            {createdAt}
          </div>
          <p>
            Send request to seller and he or she will be able to view your email
            address to contact you
          </p>
          {
            <SessionUserContext.Consumer>
              {contextUser => {
                console.log("requested", requested);
                return requested.some(user => user._id === contextUser._id) ? (
                  <Button variant="contained" color="primary" disabled>
                    Request Sent
                  </Button>
                ) : (
                  <Button
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
        </React.Fragment>
      </div>
    );
  }
}

export default ProductDetails;
