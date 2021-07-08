import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";

import './App.css';
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Shop from "./components/pages/shop/Shop";

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
            <Route exact path="/shop">
              <Shop />
            </Route>
          </Switch>
        </div>
      </Router>
    </CloudinaryContext>
  );
}

export default App;
