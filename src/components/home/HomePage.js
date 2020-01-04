import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePage extends Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Pluralsight Administration</h1>
        <p>React, Redux </p>
        <Link to="about" className="btn btn-primary btn-lg">
          Learn More
        </Link>
      </div>
    );
  }
}
