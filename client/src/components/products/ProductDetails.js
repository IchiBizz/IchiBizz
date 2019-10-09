import React, { Component } from "react";
import axios from "axios";

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
    isSold: false,
    createdAt: null
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
        console.log(`ERR`, err.response);
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

    const {
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
      createdAt
    } = this.state;

    return (
      <div>
        <h1>Product Details Page</h1>
        <React.Fragment>
          {/* <div>
          // FIXME: Images Array upload
            {
              imageUrl.map((img, index)=> {
                // Return all images
                return (
                  // FIXME: unique key w/o index
                  <div key={index}>
                    <img src={img} alt="images"/>
                  </div>
                )
              })
            }
          </div> */}
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

        </React.Fragment>
      </div>
    )
  }
}
