import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import Header from "./components/layout/header/Header";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <Header />
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
