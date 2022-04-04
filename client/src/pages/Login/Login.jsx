import "./Login.scss";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
  state = {
    userName: sessionStorage.getItem("user")
  };

  onSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:9001/signup", {
        userName: event.target.username.value,
      })
      .then((response) => {
        console.log(response);

        sessionStorage.setItem("user", JSON.stringify(response.data));

        this.setState({
          userName: response.data,
        });
      });
  };

  render() {
    if (this.state.userName !== null) {
      return <Redirect to="/game" />;
    }

    return (
      <>
        <section className="login">
          <h1 className="login__title">Welcome to Think Fast!</h1>

          <form
            className="login__form"
            action="/signup"
            method="post"
            onSubmit={this.onSubmit}
          >
            <input
              className="login__form-input"
              type="text"
              name="username"
              placeholder="Enter Username"
            />
            <button className="login__form-button" type="submit">
              Play!
            </button>
          </form>
        </section>
      </>
    );
  }
}
