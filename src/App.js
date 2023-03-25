import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/Firebase";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.scss";
import MyNav from "./components/MyNav";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import Product from "./pages/Product";

function App() {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  const [productList, setProductList] = useState([]);

  const [productListPerPage, setProductListPerPage] = useState([]);
  const [productListPageCount, setProductListPageCount] = useState(0);
  const productPerPage = 6;

  // const [pageTitle, setPageTitle] = useState("Figure World");

  const productitleref = useRef(null);

  let navigate = useNavigate();
  const myLocation = useLocation();

  //==================== Function declair
  const getRandomID = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const userStatus = async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_API}/status`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const getUserStatus = async (email) => {
  //   try {
  //     const rs = await axios.get(
  //       `${process.env.REACT_APP_SERVER_API}/users/${email}`
  //     );
  //     const data = rs.data;
  //     return data.data.status;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getProductList = async () => {
    try {
      const rs = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/products`
      );
      const data = rs.data;
      setProductList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductListPerPage = async (list, pag) => {
    let begin = (pag - 1) * productPerPage;
    let end = (pag - 1) * productPerPage + productPerPage;
    setProductListPerPage(list.slice(begin, end));
  };

  const getPageCount = (length, value) => {
    return Math.ceil(length / value);
  };

  //==================== User Auth
  useEffect(() => {
    // If user login successfully
    if (user) {
      const { uid, displayName, email, photoURL } = user;
      setUserInfo({ uid, displayName, email, photoURL });
      const data = { uid, displayName, email, photoURL };

      const temp = localStorage.getItem("userLogin");

      // Change user status === true when first login (not change if refresh page)
      if (temp === null) {
        console.log("User first login");
        userStatus(data);
        localStorage.setItem("userLogin", true);
      }

      // console.log("Login successfully!");
    }
  }, [user]);

  //==================== API Calling
  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    if (productList.length !== 0) {
      getProductListPerPage(productList, 1);
      setProductListPageCount(getPageCount(productList.length, productPerPage));
      // console.log("Check from main: ", productList.length);
    }
  }, [productList]);

  useEffect(() => {
    const { pathname } = myLocation;
    // console.log(pathname);

    if (pathname.includes("/product")) {
      document.title = "Figure World | Chi tiết sản phẩm";
    } else if (pathname === "/") {
      document.title = "Figure World";
    }
  }, [myLocation]);

  //==================== Route handling

  // Product view per page handle
  useEffect(() => {
    const { pathname } = myLocation;
    if (pathname === "/") {
      // console.log("Home page");
      getProductListPerPage(productList, 1);
    }
  }, [myLocation, productList]);

  //==================== Event handling
  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handleLogOut = () => {
    signOut(auth);
    userStatus(userInfo);
    setUserInfo("");
    localStorage.removeItem("userLogin");
    // console.log("Log out successfully!");
  };

  const handleChangeProductPag = (value, elementRef) => {
    const pag = parseInt(value);
    getProductListPerPage(productList, pag);
    window.scrollTo({
      // top: elementRef.current.offsetTop - 90,
      top: elementRef.current.offsetTop - 40,
      behavior: "smooth",
    });
  };

  const handleViewProductDetail = (id) => {
    navigate(`product/${id}`);
  };

  return (
    <div className="app">
      <MyNav
        handleSignInWithGoogle={handleSignInWithGoogle}
        handleLogOut={handleLogOut}
        userInfo={userInfo}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              getRandomID={getRandomID}
              productList={productList}
              productListPerPage={productListPerPage}
              handleChangeProductPag={handleChangeProductPag}
              productListPageCount={productListPageCount}
              productitleref={productitleref}
              handleViewProductDetail={handleViewProductDetail}
            />
          }
        />
        <Route path="/forum" element={<Forum />} />
        <Route
          path="/product/:id"
          element={<Product productList={productList} userInfo={userInfo} />}
        />
      </Routes>
    </div>
  );
}

export default App;
