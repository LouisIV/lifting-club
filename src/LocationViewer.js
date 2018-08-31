import React, { Component } from "react";
import GoogleMap from "google-map-react";
export default class LocationViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLocationPermissions: false,
      center: [37.980556, -121.309847],
      zoom: 18
    };
  }
  render() {
    return (
      <GoogleMap
        bootstrapURLKeys={{
          key: "AIzaSyBsThjmBKKkUg2FWLk8OGfTqeUiPjmMZwU"
        }}
        onClick={() => {
          console.log("Map Clicked");
        }}
        onChildClick={() => {
          console.log("Child Clicked");
        }}
        center={this.state.center}
        zoom={this.state.zoom}
      />
    );
  }
}
