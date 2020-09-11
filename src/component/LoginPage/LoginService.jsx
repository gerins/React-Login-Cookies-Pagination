import React, { Component } from "react";
import Axios from "axios";
import { Route, Switch, NavLink, Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import Cookies from "js-cookie";
import auth from "../Utils/RouteValidation/Auth";

export class LoginService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginMessage: "",
      registerMessage: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    if (Cookies.get("token")) {
      this.props.history.push("/home");
    }
  }

  handleUserLogin = async (username, password) => {
    const baseURL = `/user/login`;
    const user = {
      username: username,
      password: password,
    };
    try {
      this.setState({ isLoading: true });
      const response = await Axios.post(baseURL, user);
      const getToken = response.data.Results.Token;
      let time = new Date(new Date().getTime() + 60 * 60 * 1000); // 60 menit
      Cookies.set("token", getToken, { expires: time });
      Cookies.set("user", username, { expires: time });
      auth.login(() => {
        this.props.history.push("/home");
      });
    } catch (err) {
      this.setState({ loginMessage: `Username atau Password salah`, isLoading: false });
      console.log(err.response.data);
    }
  };

  handleUserRegister = async (username, password) => {
    const baseURL = `/user/register`;
    const user = {
      username: username,
      password: password,
    };
    try {
      const response = await Axios.post(baseURL, user);
      this.setState({ registerMessage: response.data.Message });
    } catch (err) {
      this.setState({ registerMessage: err.response.data.Results });
      console.log(err.response.data);
    }
  };

  render() {
    return (
      <div>
        <LoginForm
          state={this.state}
          handleUserLogin={this.handleUserLogin}
          handleUserRegister={this.handleUserRegister}
        />
      </div>
    );
  }
}

export default LoginService;
