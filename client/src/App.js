import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";

import './App.css';
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Shop from "./components/pages/shop/Shop";
import Product from "./components/pages/product/Product";
import Auth from "./components/pages/auth/Auth";
import AddProduct from "./components/pages/add-product/AddProduct";
import UpdateProduct from "./components/pages/update-product/UpdateProduct";

import useAuthStore from "./stores/AuthStore";

function App() {
  // State store funcs
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAdmin = useAuthStore((state) => state.setIsAdmin);

  useEffect(() => {
    if (localStorage.accessToken) {
      const accessToken = localStorage.getItem("accessToken");
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      setToken(accessToken);
      setUser(userInfo);
      setIsAdmin(userInfo.isAdmin);
    }
  }, [setToken, setUser, setIsAdmin]);

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
            <Route exact path="/admin/collections/add-product">
              <AddProduct />
            </Route>
            <Route exact path="/admin/collections/update-product/:productId">
              <UpdateProduct />
            </Route>
            <Route exact path="/auth/sign-up">
              <Auth title="Sign Up" imgPublicId="evergreen-app/sign-up/sign-up-bg_a3cud7.jpg" imgWidth="1920" imgHeight="1280" />
            </Route>
            <Route exact path="/auth/log-in">
              <Auth title="Log In" imgPublicId="evergreen-app/log-in/succulent-bg_c9tles" imgWidth="1920" imgHeight="1192" />
            </Route>
            <Route exact path="/admin/auth/sign-up">
              <Auth title="Admin Sign Up" imgPublicId="evergreen-app/sign-up/sign-up-bg_a3cud7.jpg" imgWidth="1920" imgHeight="1280" />
            </Route>
            <Route exact path="/admin/auth/log-in">
              <Auth title="Admin Log In" imgPublicId="evergreen-app/log-in/succulent-bg_c9tles" imgWidth="1920" imgHeight="1192" />
            </Route>
          </Switch>
        </div>
      </Router>
    </CloudinaryContext>
  );
}

export default App;
