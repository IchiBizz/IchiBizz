import React, { Component } from "react";
import axios from "axios";
// import AddProduct from "./AddProduct";
// import {
//   Button,
//   Grid
// } from "@material-ui/core";

export default class ProductDetails extends Component {
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
    createdAt: null
  };

  getData = () => {
    const id = this.props.match.params.id;
    // console.log(`id`, id)

    axios
      .get(`/api/products/${id}`)
      .then(response => {
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
          condition: response.data.condition
        });

        console.log(`GET this.state.response`, response.data)
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    // TODO 1: Implement Material UI Styles once we agreed on one style
    // TODO 2 - @Ninette: Add latitude, longitude
    const {
      title,
      description,
      imageUrl,
      brand,
      tags,
      category,
      quantity,
      price,
      currency,
      company,
      availability,
      warrantyUntil,
      condition,
      createdAt
    } = this.state;

    return (
      <div>
        <h1>Product Details Page</h1>
        <React.Fragment>
        <div>
          {
            imageUrl.map(img => {
              // Return all images
              return (
                <img src={img} alt="images"/>
              )
            })
          }
        </div>

          <h3>{title}</h3>
          <div>
            {description}
            {brand}
            {tags}
            {category}
            {quantity}
            {price}
            {currency}
            {company}
            {/* TODO: latitude, longitude @Ninette */}
            {availability}
            {warrantyUntil}
            {condition}
            {createdAt}
          </div>
        </React.Fragment>
      </div>
    )
  }
}
