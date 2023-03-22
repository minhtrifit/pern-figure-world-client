import React, { useEffect, useState } from "react";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/Firebase";
import "./App.scss";
import MyNav from "./components/MyNav";

function App() {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});

  const userStatus = async (data) => {
    await axios.post(`${process.env.REACT_APP_SERVER_API}/status`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    </div>
  );
}

export default App;
