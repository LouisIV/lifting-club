import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { submitForm } from "./GoogleDriveManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faQuestionCircle,
  faSpinnerThird
} from "@fortawesome/pro-light-svg-icons";

function degreesToRads(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}

function getLocationVanilla() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        alert(
          `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`
        );
      },
      error => {
        alert(`${error}`);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// How close do you have to be to Baun? (meters)
const MIN_DIST_BAUN = 250;

class Container extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "NOT SET",
      meters: -500,
      checkingLocation: false
    };
    // this.getLocation = this.getLocation.bind(this);
    this.gotLocation = this.gotLocation.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  componentWillMount() {
    const { cookies } = this.props;
    if (cookies) {
      var email = cookies.get("email") || "NOT SET";
      this.setState({ email });
    } else {
      console.log("Failed to get cookies!");
    }
  }

  componentDidMount() {
    /*
    if (navigator.geolocation) {
      alert("Calling getCurrentPosition");
      this.setState({ checkingLocation: true });
      navigator.geolocation.getCurrentPosition(this.gotLocation);
    } else {
      alert("Cannot fetch your location");
    }
    */
  }

  handleEmailChange(event) {
    let email = event.target.value.toLowerCase();
    const { cookies } = this.props;
    cookies.set("email", email);
    console.log(String(email));
    this.setState({ email });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.gotLocation);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  gotLocation(position) {
    console.log("got location");
    const lat1 = position.coords.latitude;
    const lon1 = position.coords.longitude;

    // POS of Baun
    const lat2 = 37.980738;
    const lon2 = -121.312822;
    const radius = 6371; // Radius of the earth in km
    const dLat = degreesToRads(lat2 - lat1); // Javascript functions in radians
    const dLon = degreesToRads(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRads(lat1)) *
        Math.cos(degreesToRads(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    console.log(`a: ${a}`);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = radius * c; // Distance in km
    this.setState({ meters: Math.round(d * 1000), checkingLocation: false });
  }

  render() {
    return (
      <div className="Container">
        <div className="title">
          <span>KAPPA NU LIFTING CLUB</span>
        </div>
        {/* <LocationViewer /> */}
        <div className="metersBox">
          <FontAwesomeIcon
            icon={
              this.state.meters !== -500
                ? this.state.meters <= MIN_DIST_BAUN
                  ? faCheckCircle
                  : faTimesCircle
                : faQuestionCircle
            }
            color={
              this.state.meters !== -500
                ? this.state.meters <= MIN_DIST_BAUN
                  ? "#2ECC71"
                  : "#F03434"
                : "white"
            }
            size="6x"
            className="largeIcon"
          />
          <span>
            {this.state.meters !== -500 ? (
              this.state.meters <= MIN_DIST_BAUN ? (
                "Have a good workout!"
              ) : this.state.checkingLocation ? (
                <div>
                  Finding you <FontAwesomeIcon icon={faSpinnerThird} spin />
                </div>
              ) : (
                `${this.state.meters} Meters from Baun`
              )
            ) : this.state.checkingLocation ? (
              <div>
                Finding you <FontAwesomeIcon icon={faSpinnerThird} spin />
              </div>
            ) : (
              <span>Check your Location</span>
            )}
          </span>
          <input
            type="text"
            placeholder={"email"}
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </div>

        <div className="buttons">
          <button
            className="button"
            onClick={() => {
              getLocationVanilla();
              this.setState({ checkingLocation: true });
              this.getLocation();
            }}
          >
            Check my location
          </button>
          <button
            onClick={() => {
              submitForm({
                email: this.state.email,
                check: "In"
              });
            }}
            className="button"
            style={{ backgroundColor: "#2ECC71" }}
          >
            <span className="centered">Check In</span>
          </button>
          <button
            onClick={() => {
              submitForm({
                email: this.state.email,
                check: "Out"
              });
            }}
            style={{ backgroundColor: "#F03434" }}
            className="button"
          >
            <span className="centered">Check Out</span>
          </button>
          <button
            onClick={() => {
              window.open(
                "https://docs.google.com/spreadsheets/d/15cDq44RLH83StgCC8wA9VoS_Aytm6d4RAmMJ5_8YT-I/edit?usp=sharing"
              );
            }}
            style={{ backgroundColor: "transparent" }}
            className="button"
          >
            <span className="centered" style={{ color: "white" }}>
              View Hours
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default withCookies(Container);
