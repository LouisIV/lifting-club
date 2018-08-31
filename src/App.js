import React, { Component } from "react";
import Container from "./Container";
import "./index.css";
import { CookiesProvider } from "react-cookie";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faCoffee } from "@fortawesome/free-solid-svg-icons";
// import { falCheckCircle } from "@fortawesome/pro-light-svg-icons";

// library.add(faCheck, faCheckCircle);

class App extends Component {
  render() {
    return (
      <div className="App">
        <CookiesProvider>
          <Container />
        </CookiesProvider>
      </div>
    );
  }
}

export default App;
