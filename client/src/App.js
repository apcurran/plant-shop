import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import Header from "./components/layout/header/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
