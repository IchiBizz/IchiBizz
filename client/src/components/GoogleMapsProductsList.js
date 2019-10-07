import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

function MapList(props) {
  console.log("props here:", props);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  return (
    <>
      <GoogleMap
        defaultZoom={10}
        // defaultCenter={{}}
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
              <h2>{selectedProduct.name}</h2>
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

export default function GoogleMapsProductsList() {
  return (
    <div style={{ width: "40vw", height: "80vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAEEpqstn15A1q4yFwIv81jnDVG7X0hm9Q`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
