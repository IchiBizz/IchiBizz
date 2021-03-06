import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAEEpqstn15A1q4yFwIv81jnDVG7X0hm9Q");
Geocode.enableDebug();

class GoogleMapsInput extends Component {
  state = {
    center: {
      lat: this.props.center.lat,
      lng: this.props.center.lng
    }
  };

  getCity = addressArray => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_1" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  getCountry = addressArray => {
    let country = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && "country" === addressArray[i].types[0]) {
        country = addressArray[i].long_name;
        return country;
      }
    }
  };

  onPlaceSelected = place => {
    console.log(place);
    if (place.formatted_address) {
      const address = place.formatted_address,
        addressArray = place.address_components,
        city = this.getCity(addressArray),
        country = this.getCountry(addressArray),
        latValue = place.geometry.location.lat(),
        lngValue = place.geometry.location.lng();

      this.props.getMapData(address, city, country, latValue, lngValue);
    } else {
      Geocode.fromAddress(place.name)
        .then(response => {
          console.log(response);
          const data = response.results[0];
          const address = data.formatted_address,
            addressArray = data.address_components,
            city = this.getCity(addressArray),
            country = this.getCountry(addressArray),
            latValue = data.geometry.location.lat,
            lngValue = data.geometry.location.lng;

          this.props.getMapData(address, city, country, latValue, lngValue);
        })
        .then(err => {
          console.log(err);
        });
    }
  };

  onMarkerDrag = event => {
    console.log(event);
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng)
      .then(response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          country = this.getCountry(addressArray);

        this.props.getMapData(address, city, country, newLat, newLng);
      })
      .catch(err => {
        console.log(err);
      });
  };

  shouldComponentUpdate( nextProps, nextState ){
    return false
  }

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          center={{
            lat: this.props.mapPosition.lat,
            lng: this.props.mapPosition.lng
          }}
        >
          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={this.props.address}
            draggable={true}
            onDragEnd={this.onMarkerDrag}
            position={{
              lat: this.props.markerPosition.lat,
              lng: this.props.markerPosition.lng
            }}
          />
          <Marker />
          {/* For Auto complete Search Box */}
          <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "100px"
            }}
            onPlaceSelected={this.onPlaceSelected}
          />
        </GoogleMap>
      ))
    );

    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <>
          <div>
            <AsyncMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAEEpqstn15A1q4yFwIv81jnDVG7X0hm9Q&libraries=places"
              loadingElement={
                <div style={{ height: `100%`, width: "1000px" }} />
              }
              containerElement={
                <div style={{ height: this.props.height, width: "1000px" }} />
              }
              mapElement={<div style={{ height: `100%`, width: "1000px" }} />}
            />
            <p>{this.props.address}</p>
          </div>
        </>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}

export default GoogleMapsInput;
