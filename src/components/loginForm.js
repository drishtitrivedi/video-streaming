import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      logging: 0,
      loginObject: [],
      Data: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleInputChange.bind(this);
  }

  // handle form input change event
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // handle form submit
  handleSubmit(e) {
    e.preventDefault();

    const result = fetch(
      `http://localhost/video-streaming/authentication.php?${this.state.username}/${this.state.password}`,
      {
        headers: [["Content-Type", "text/plain"]],
        mode: "cors",
      }
    );

    result
      .then((response) => response.json())
      .then((d) => {
        this.setState({ loginObject: d[0] });
        localStorage.setItem("userName", d[0].username);
        localStorage.setItem("userRole", d[0].role);
      });

    return <Redirect to="/videos" />;
  }

  render() {
    const username = localStorage.getItem("userName");
    if (username) {
      return <Redirect to="/videos" />;
    }

    return (
      <React.Fragment>
        <div className="container">
          <h3 className="pt-5">Log in</h3>
          <p>
            {this.state.logging === 1 && (
              <div role="alert" className="fade alert alert-danger show mt-2">
                Incorrect Username or Password!
              </div>
            )}
          </p>
          <div className="page-header d-flex justify-content-center mt-3">
            <Form style={{ width: 600 }} onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  autoFocus
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
