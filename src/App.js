import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Videos from "./components/items/videos";
import Audios from "./components/items/audios";
import Images from "./components/items/images";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/items/header";

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <Header />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/videos" component={Videos} />
          <Route path="/audios" component={Audios} />
          <Route path="/images" component={Images} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default withRouter(App);
