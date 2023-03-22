import React, { useEffect, useState } from "react";
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

  //==================== Function declair
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

  return (
    <div className="app">
      <MyNav
        handleSignInWithGoogle={handleSignInWithGoogle}
        handleLogOut={handleLogOut}
        userInfo={userInfo}
      />
      <Routes>
        <Route path="/" element={<Home productList={productList} />} />
      </Routes>
    </div>
  );
}

export default App;
