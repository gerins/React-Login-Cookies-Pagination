import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./component/HomePage/HomePage";
import LoginService from "./component/LoginPage/LoginService";
import ProductContainer from "./component/Domains/Products/ProductContainer";
import ProtectedRoute from "./component/Utils/RouteValidation/ProtectedRoute";
import store from "./redux/store";
import FormExample from "./FormExample";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={LoginService} />
          <ProtectedRoute exact path="/home" component={HomePage} />
          <ProtectedRoute exact path="/product" component={ProductContainer} />
          <ProtectedRoute exact path="/users" component={FormExample} />
          <Route path="*" component={() => <h1>"404 NOT FOUND"</h1>} />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
