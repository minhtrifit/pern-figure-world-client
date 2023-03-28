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
import Pay from "./pages/Pay";

function App() {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  const [productList, setProductList] = useState([]);

  const [productListPerPage, setProductListPerPage] = useState([]);
  const [productListPageCount, setProductListPageCount] = useState(0);
  const productPerPage = 6;

  const productitleref = useRef(null);

  let navigate = useNavigate();
  const myLocation = useLocation();

  const [cartList, setCartList] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartDetailList, setCartDetailList] = useState([]);

  //==================== Function declair
  const getRandomID = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const getDay = () => {
    const init = new Date();
    const day = init.getDate();
    const month = init.getMonth() + 1;
    const year = init.getFullYear();
    const result = day + "/" + month + "/" + year;
    return result;
  };

  const randomUniqueArray = (size, max) => {
    let arr = [];
    let element = 0;
    for (var i = 0; i < size; ++i) {
      do {
        element = getRandomID(1, max);
      } while (arr.includes(element));
      arr.push(element);
    }
    return arr;
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
    } else if (pathname === "/pay") {
      document.title = "Figure World | Thanh toán";
    } else if (pathname === "/") {
      document.title = "Figure World";
    }
  }, [myLocation]);

  // useEffect(() => {
  //   if (cartList.length !== 0) {
  //     console.log(cartList);
  //   }
  // }, [cartList]);

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

  const handleAddCart = (
    setOpenLoginAlert,
    setOpenSuccessAlert,
    targetProduct,
    cartAmount
  ) => {
    // User not login
    if (Object.keys(userInfo).length === 0) {
      setOpenLoginAlert(true);
    } else {
      let checkInit = false;

      // console.log(targetProduct);

      const product = {
        user_email: userInfo.email,
        product_id: targetProduct.id,
        amount: cartAmount,
        price: targetProduct.price * cartAmount,
      };

      const productDetail = {
        product_id: targetProduct.id,
        name: targetProduct.name,
        photo_url: targetProduct.photo_url[0],
        amount: cartAmount,
        price: targetProduct.price * cartAmount,
      };

      // console.log(product);
      // console.log(productDetail);

      // set nav cart amount
      let tempCartTotal = totalCart;
      tempCartTotal += product.amount;
      setTotalCart(tempCartTotal);

      // If product init in cart list
      for (var i = 0; i < cartList.length; ++i) {
        if (cartList[i].product_id === product.product_id) {
          // Update amount
          cartList[i].amount += product.amount;
          cartDetailList[i].amount += productDetail.amount;

          // Update price
          cartList[i].price = cartList[i].amount * targetProduct.price;
          cartDetailList[i].price =
            cartDetailList[i].amount * targetProduct.price;

          checkInit = true;
        }
      }

      if (!checkInit) {
        setCartList([...cartList, product]); // Save to database
        setCartDetailList([...cartDetailList, productDetail]); // Cart showing
      }

      // console.log(cartList);
      // console.log(cartDetailList);
      setOpenSuccessAlert(true);
    }
  };

  const handleDeleteCartItem = (product) => {
    const tempCartList = cartList.filter((item) => {
      return item.product_id !== product.product_id;
    });

    const [tempTargetProduct] = cartList.filter((item) => {
      return item.product_id === product.product_id;
    });

    const tempCartDetailList = cartDetailList.filter((item) => {
      return item.product_id !== product.product_id;
    });

    // Update total amount
    let tempTotal = totalCart;
    tempTotal -= tempTargetProduct.amount;
    setTotalCart(tempTotal);

    // Update cart list
    setCartList(tempCartList);
    setCartDetailList(tempCartDetailList);
  };

  const handleCartPay = (handleCloseCartModal) => {
    handleCloseCartModal();
    navigate("pay");
  };

  const handleConfirmCart = async (cartList) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_API}/carts/confirm`,
        cartList,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Reset cart
      setCartList([]);
      setCartDetailList([]);
      setTotalCart(0);

      console.log(cartList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPost = (setOpenLoginAlert, setOpenSuccessAlert) => {
    // User not login
    if (Object.keys(userInfo).length === 0) {
      setOpenLoginAlert(true);
    } else {
      setOpenSuccessAlert(true);
    }
  };

  //==================== Main function component

  return (
    <div className="app">
      <MyNav
        handleSignInWithGoogle={handleSignInWithGoogle}
        handleLogOut={handleLogOut}
        userInfo={userInfo}
        showCartModal={showCartModal}
        setShowCartModal={setShowCartModal}
        cartList={cartList}
        totalCart={totalCart}
        cartDetailList={cartDetailList}
        getRandomID={getRandomID}
        handleDeleteCartItem={handleDeleteCartItem}
        handleCartPay={handleCartPay}
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
          element={
            <Product
              productList={productList}
              userInfo={userInfo}
              getRandomID={getRandomID}
              randomUniqueArray={randomUniqueArray}
              handleViewProductDetail={handleViewProductDetail}
              myLocation={myLocation}
              handleAddCart={handleAddCart}
              handleAddPost={handleAddPost}
            />
          }
        />
        <Route
          path="/pay"
          element={
            <Pay
              userInfo={userInfo}
              cartList={cartList}
              cartDetailList={cartDetailList}
              handleViewProductDetail={handleViewProductDetail}
              getRandomID={getRandomID}
              handleConfirmCart={handleConfirmCart}
              getDay={getDay}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
