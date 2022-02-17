import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Shop categoryQueryText="all" titleBarText="Shop All Collections" />} />
            <Route path="/collections/house-plants" element={<Shop categoryQueryText="house plants" titleBarText="House Plants" />} />
            <Route path="/collections/fruit-trees" element={<Shop categoryQueryText="fruit trees" titleBarText="Fruit Trees" />} />
            <Route path="/collections/shade-trees" element={<Shop categoryQueryText="shade trees" titleBarText="Shade Trees" />} />
            <Route path="/collections/:productId" element={<Product />} />
            <Route path="/admin/collections/add-product" element={<AddProduct />} />
            <Route path="/admin/collections/update-product/:productId" element={<UpdateProduct />} />
            <Route path="/auth/sign-up" element={<Auth title="Sign Up" imgPublicId="evergreen-app/sign-up/sign-up-bg_a3cud7.jpg" imgWidth="1920" imgHeight="1280" />} />
            <Route path="/auth/log-in" element={<Auth title="Log In" imgPublicId="evergreen-app/log-in/succulent-bg_c9tles" imgWidth="1920" imgHeight="1192" />} />
            <Route path="/auth/reset-password/:id" element={<Auth title="Reset Password" imgPublicId="evergreen-app/reset-password/forgot-password_n8rcnd.jpg" imgWidth="1920" imgHeight="1081" />} />
            <Route path="/auth/forgot-password" element={<Auth title="Forgot Password" imgPublicId="evergreen-app/reset-password/forgot-password_n8rcnd.jpg" imgWidth="1920" imgHeight="1081" />} />
            <Route path="/admin/auth/sign-up" element={<Auth title="Admin Sign Up" imgPublicId="evergreen-app/sign-up/sign-up-bg_a3cud7.jpg" imgWidth="1920" imgHeight="1280" />} />
            <Route path="/admin/auth/log-in" element={<Auth title="Admin Log In" imgPublicId="evergreen-app/log-in/succulent-bg_c9tles" imgWidth="1920" imgHeight="1192" />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
        </div>
      </Router>
    </CloudinaryContext>
  );
}

export default App;
