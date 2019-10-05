import React from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { Typography, Paper } from "@material-ui/core";

class GoogleMapsProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClick = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    const style = {
      width: "50vw",
      height: "75vh",
      marginLeft: "auto",
      marginRight: "auto"
    };

    return (
      <Map
        item
        xs={12}
        style={style}
        google={this.props.google}
        onClick={this.onMapClick}
        zoom={2}
        // initialCenter={{ lat: 39.648209, lng: -75.711185 }}
      >
        {this.props.filteredProduct.map(product => {
          let lat = product.location.latitude;
          let long = product.location.longitude;
          console.log(lat, long);
          return (
            <Marker
              onClick={this.onMarkerClick}
              title={"Changing Colors Garage"}
              position={{
                lat: lat,
                lng: long
              }}
              name={"Changing Colors Garage"}
            />
          );
        })}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <Paper>
            <Typography variant="headline" component="h4">
              Changing Colors Garage
            </Typography>
            <Typography component="p">
              98G Albe Dr Newark, DE 19702 <br />
              302-293-8627
            </Typography>
          </Paper>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAEEpqstn15A1q4yFwIv81jnDVG7X0hm9Q"
})(GoogleMapsProductList);
