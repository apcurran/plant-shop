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
import ShoppingCart from "./components/pages/shopping-cart/ShoppingCart";
import PaymentSuccess from "./components/pages/payment-success/PaymentSuccess";
import Checkout from "./components/pages/checkout/Checkout";
import OrderHistory from "./components/pages/order-history/OrderHistory";

import useAuthStore from "./stores/AuthStore";
import useCartStore from "./stores/CartStore";

function App() {
  // State auth store funcs
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAdmin = useAuthStore((state) => state.setIsAdmin);
  // State cart store funcs
  const setItems = useCartStore((state) => state.setItems);
  const setTotalQuantity = useCartStore((state) => state.setTotalQuantity);

  // Auth init
  useEffect(() => {
    if (sessionStorage.accessToken) {
      const accessToken = sessionStorage.getItem("accessToken");
      const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

      setToken(accessToken);
      setUser(userInfo);
      setIsAdmin(userInfo.isAdmin);
    }
  }, [setToken, setUser, setIsAdmin]);

  // Cart init
  useEffect(() => {
    if (sessionStorage.items) {
      const cartItems = JSON.parse(sessionStorage.getItem("items"));
      const totalQtyAmt = Number(sessionStorage.getItem("totalQuantity")); // Converted back to num from str val stored in sessionStorage

      setItems(cartItems);
      setTotalQuantity(totalQtyAmt);
    }
  }, [setItems, setTotalQuantity]);

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
            <Route exact path="/cart">
              <ShoppingCart />
            </Route>
            <Route exact path="/success">
              <PaymentSuccess />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
            <Route exact path="/orders">
              <OrderHistory />
            </Route>
          </Switch>
        </div>
      </Router>
    </CloudinaryContext>
  );
}

export default App;
