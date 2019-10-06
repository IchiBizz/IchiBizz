import React, { Component } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
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
    console.log(`id`, id)
    axios
      .get(`/api/products/${id}`)
      .then(response => {
        this.setState({
          product: response.data,
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

        // FIXME: Cast error: undefined
        console.log(`GET this.state.product`, response)
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
    if (this.state.error)
    return <div>{this.state.error}</div>;
    else if (!this.state.project) return <></>;
    console.log(`[ProductDetails.js] return`, this.state)

    return (
      <div>
        <h1>Hello from ProductDetails Page</h1>
        <AddProduct
          productId={this.state.product._id}
          // FIXME: get props data from child
          getData={this.getData}
        />
      </div>
    )
  }
}
