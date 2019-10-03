import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ProductsList extends Component {
  state = {
    products: []
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

  render() {
    return (
      <>
        <h1>Product List</h1>
        <table>
          <tr>
            <th>Name</th>

            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {this.state.products.map(data => {
            return (
              <tr>
                <Link to={`/products/${data._id}`}>
                  <td>{data.name}</td>
                </Link>
                <td>{data.description}</td>
                <td>{data.quantity}</td>
                <td>{data.price}</td>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}
