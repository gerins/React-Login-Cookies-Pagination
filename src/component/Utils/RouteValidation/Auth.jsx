import Cookies from "js-cookie";
class Auth {
  constructor() {
    this.authenticated = false;
  }

  login = (cb) => {
    this.authenticated = true;
    cb();
  };

  logout = (cb) => {
    this.authenticated = false;
    cb();
  };

  isAuthenticated = () => {
    if (Cookies.get("token")) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }

    return this.authenticated;
  };
}

export default new Auth();
