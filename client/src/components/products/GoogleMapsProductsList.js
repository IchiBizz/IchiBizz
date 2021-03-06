import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

function MapList(props) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log("testttt", props);
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedProduct(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const mapStyles = {
    width: "100%",
    height: "100%"
  };

  return (
    <>
      <GoogleMap
        style={mapStyles}
        defaultZoom={4}
        defaultCenter={{ lat: -34, lng: 150 }}
        // defaultOptions={{ styles: mapStyles }}
      >
        {props.filteredProduct.map(product => (
          <Marker
            key={product._id}
            position={{
              lat: product.location.latitude,
              lng: product.location.longitude
            }}
            onClick={() => {
              setSelectedProduct(product);
            }}
            icon={{
              url: "/map-marker-alt-solid.svg",
              scaledSize: new window.google.maps.Size(25, 25)
            }}
          />
        ))}
        {selectedProduct && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedProduct(null);
            }}
            position={{
              lat: selectedProduct.location.latitude,
              lng: selectedProduct.location.longitude
            }}
          >
            <div>
              <h2>{selectedProduct.title}</h2>
              <p>{selectedProduct.price}</p>
              <p>{selectedProduct.quantity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(MapList));

export default function GoogleMapsProductsList(props) {
  console.log(props);
  return (
    <div>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAEEpqstn15A1q4yFwIv81jnDVG7X0hm9Q`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: "500px", width: "800px" }} />}
        filteredProduct={props.filteredProduct}
      />
    </div>
  );
}
