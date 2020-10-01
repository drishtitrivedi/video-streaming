import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column pt-5">
          <main role="main" className="inner cover text-center">
            <h2 className="cover-heading">
              Please authenticate to see all items.
            </h2>

            <p className="lead">
              <Button variant="light">
                <Link to="/login">Login</Link>
              </Button>
            </p>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
