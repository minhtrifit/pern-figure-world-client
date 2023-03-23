import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/Firebase";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import MyNav from "./components/MyNav";
import Home from "./pages/Home";

function App() {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  const [productList, setProductList] = useState([]);

  const [productListPerPage, setProductListPerPage] = useState([]);
  const productPerPage = 6;

  const productitleref = useRef(null);

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

  //==================== User Auth
  useEffect(() => {
    if (user) {
      const { uid, displayName, email, photoURL } = user;
      setUserInfo({ uid, displayName, email, photoURL });
      const data = { uid, displayName, email, photoURL };
      userStatus(data);
      console.log("Login successfully!");
    }
  }, [user]);

  //==================== API Calling
  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    if (productList.length !== 0) {
      getProductListPerPage(productList, 1);
      // console.log("Check from main: ", productList.length);
    }
  }, [productList]);

  //==================== Event handling
  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handleLogOut = () => {
    signOut(auth);
    userStatus(userInfo);
    setUserInfo("");
    console.log("Log out successfully!");
  };

  const handleChangeProductPag = (value, elementRef) => {
    const pag = parseInt(value);
    getProductListPerPage(productList, pag);
    window.scrollTo({
      top: elementRef.current.offsetTop - 90,
      behavior: "smooth",
    });
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
              productitleref={productitleref}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
