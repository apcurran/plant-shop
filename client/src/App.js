import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";

import './App.css';
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Shop from "./components/pages/shop/Shop";
import Product from "./components/pages/product/Product";
import SignUp from "./components/pages/auth/sign-up/SignUp";
import LogIn from "./components/pages/log-in/LogIn";

function App() {
  return (
    <CloudinaryContext cloudName="dev-project" secure="true">
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/collections">
              <Shop categoryQueryText="all" titleBarText="Shop All Collections" />
            </Route>
            <Route exact path="/collections/house-plants">
              <Shop categoryQueryText="house plants" titleBarText="House Plants" />
            </Route>
            <Route exact path="/collections/fruit-trees">
              <Shop categoryQueryText="fruit trees" titleBarText="Fruit Trees" />
            </Route>
            <Route exact path="/collections/shade-trees">
              <Shop categoryQueryText="shade trees" titleBarText="Shade Trees" />
            </Route>
            <Route exact path="/collections/:productId">
              <Product />
            </Route>
            <Route exact path="/auth/sign-up">
              <SignUp />
            </Route>
            <Route exact path="/auth/log-in">
              <LogIn />
            </Route>
          </Switch>
        </div>
      </Router>
    </CloudinaryContext>
  );
}

export default App;
