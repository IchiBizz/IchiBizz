import React, { Component } from "react";
import axios from "axios";

export const ProductContext = React.createContext();

export default class ProductContextProvider extends Component {
  state = {
    products: []
  };

  getProductData = () => {
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

  updateProductData = products => {
    this.setState({ products });
  };

  componentDidMount = () => {
    this.getProductData();
  };

  render() {
    console.log(this.state.products);
    return (
      <ProductContext.Provider
        value={{ state: this.state, updateProductData: this.updateProductData }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
