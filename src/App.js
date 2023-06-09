import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/Firebase";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.scss";
import MyNav from "./components/MyNav";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import Forum from "./pages/Forum";
import Product from "./pages/Product";
import Pay from "./pages/Pay";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

function App() {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const [allUserList, setAllUserList] = useState([]);

  const [productList, setProductList] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchProductList, setSearchProductList] = useState([]);

  const [authToken, setAuthToken] = useState("");
  const [userTokenInfo, setUserTokenInfo] = useState({});

  const [productListPerPage, setProductListPerPage] = useState([]);
  const [productListPageCount, setProductListPageCount] = useState(0);
  const productPerPage = 6;

  const productitleref = useRef(null);

  let navigate = useNavigate();
  const myLocation = useLocation();

  const [cartList, setCartList] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [userCart, setUserCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartDetailList, setCartDetailList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [forumLoading, setForumLoading] = useState(true);

  const [postList, setPostList] = useState([]);
  const [userPost, setUserPost] = useState([]);

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

  const userAuth = async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_API}/users/auth`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const userToken = async (data) => {
    try {
      const rs = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/users/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return rs.data;
    } catch (error) {
      console.log(error);
    }
  };

  const userVerifyToken = async (token) => {
    try {
      const data = {
        token: token,
      };
      const rs = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/users/verify`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (rs.data.user) {
        // return rs.data.user;
        setUserTokenInfo(rs.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByEmail = async (email) => {
    try {
      const rs = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/users/${email}`
      );
      const data = rs.data;
      setUserDetail(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByEmailCallBack = useCallback((email) => {
    getUserByEmail(email);
  }, []);

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

  const getAllUser = async () => {
    try {
      const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/users`);
      const data = rs.data;
      if (data.data) {
        setAllUserList(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createNewPost = async (data) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_API}/posts/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPosts = async () => {
    try {
      const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/posts`);
      const data = rs.data;
      setPostList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCartByUser = async () => {
    try {
      const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/carts`);
      const data = rs.data.data;

      if (Object.keys(userInfo).length !== 0) {
        const sortCart = data.filter((item) => {
          return item.user_email === userInfo.email;
        });

        // setUserCart(sortCart);

        if (sortCart && productList) {
          let tempCart = [];
          for (var i = 0; i < sortCart.length; ++i) {
            for (var j = 0; j < productList.length; ++j) {
              if (sortCart[i].product_id === productList[j].id) {
                const cart = {
                  cart_id: sortCart[i].order_id,
                  product_id: productList[j].id,
                  name: productList[j].name,
                  photoURL: productList[j].photo_url[0],
                  price: productList[j].price,
                  amount: sortCart[i].amount,
                  date: sortCart[i].date.split("T"),
                };
                tempCart.push(cart);
              }
            }
          }

          setUserCart(tempCart);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPostByUser = async () => {
    try {
      const rs = await axios.get(`${process.env.REACT_APP_SERVER_API}/posts`);
      const data = rs.data.data;

      if (Object.keys(userInfo).length !== 0) {
        const sortPost = data.filter((item) => {
          return item.user_email === userInfo.email;
        });

        if (sortPost) {
          let tempPost = [];
          for (var i = 0; i < sortPost.length; ++i) {
            for (var j = 0; j < productList.length; ++j) {
              if (
                sortPost[i].user_email === userInfo.email &&
                sortPost[i].product_id === productList[j].id
              ) {
                console.log(sortPost[i]);
                const post = {
                  user_email: sortPost[i].user_email,
                  displayName: userInfo.displayName,
                  photoURL: userInfo.photoURL,
                  rating: sortPost[i].rating,
                  content: sortPost[i].content,
                  date: sortPost[i].date.split("T"),
                  product_info: productList[j],
                };
                tempPost.push(post);
              }
            }
          }
          // console.log(tempPost);
          setUserPost(tempPost);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //==================== User Auth
  useEffect(() => {
    // If user login successfully
    if (user) {
      const { uid, displayName, email, photoURL } = user; // Get user info from Firebase

      setUserInfo({ uid, displayName, email, photoURL });
      const data = { uid, displayName, email, photoURL };

      const temp = localStorage.getItem("userLogin");

      // Change user status === true when first login (not change if refresh page)
      if (temp === null) {
        // console.log("User first login");

        userAuth(data); // Call API to set User Auth
        localStorage.setItem("userLogin", true);
      }

      // console.log("Login successfully!");
    }
  }, [user]);

  //==================== User Account Auth

  useEffect(() => {
    const checkToken = localStorage.getItem("token");

    if (checkToken) {
      userVerifyToken(checkToken);
    } else {
      if (authToken) {
        localStorage.setItem("token", authToken);

        const temp = localStorage.getItem("token");

        if (temp !== null) {
          userVerifyToken(temp);
        }
      }
    }
  }, [authToken]);

  useEffect(() => {
    // If verify user successfully
    if (Object.keys(userTokenInfo).length !== 0) {
      // console.log("User login with account", userTokenInfo);

      setUserInfo(userTokenInfo);

      const temp = localStorage.getItem("userLogin");

      if (temp === null) {
        userAuth(userTokenInfo); // Call API to set User Auth
        localStorage.setItem("userLogin", true);
      }
    }
  }, [userTokenInfo]);

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
    } else if (pathname === "/forum") {
      document.title = "Figure World | Diễn đàn";
    } else if (pathname === "/") {
      document.title = "Figure World";
    }
  }, [myLocation]);

  //==================== Forum API Calling

  useEffect(() => {
    const { pathname } = myLocation;

    if (pathname === "/forum" && Object.keys(userInfo).length !== 0) {
      getUserByEmailCallBack(userInfo.email);
    }

    if (pathname === "/profile" && Object.keys(userInfo).length !== 0) {
      getUserByEmailCallBack(userInfo.email);
    }
  }, [myLocation, userInfo, getUserByEmailCallBack]);

  useEffect(() => {
    const { pathname } = myLocation;

    if (pathname === "/forum") {
      getAllPosts();
      getAllUser();
    }
  }, [myLocation, userInfo]);

  //==================== Route handling

  // Product view per page handle
  useEffect(() => {
    const { pathname } = myLocation;
    if (pathname === "/") {
      // console.log("Home page");
      getProductListPerPage(productList, 1);
    }
  }, [myLocation, productList]);

  //==================== Product loading handling

  useEffect(() => {
    const { pathname } = myLocation;
    // console.log(pathname);

    // Add pathname below this comment if want loading animation...
    if (pathname.includes("/product")) {
      // console.log("Check loading: ", loading);

      if (loading) {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } else {
      setLoading(true);
    }
  }, [myLocation, loading]);

  //==================== Forum loading handling

  useEffect(() => {
    const { pathname } = myLocation;

    // Add pathname below this comment if want loading animation...
    if (pathname === "/forum") {
      if (forumLoading) {
        setTimeout(() => {
          setForumLoading(false);
        }, 2000);
      }
    } else {
      setForumLoading(true);
    }
  }, [myLocation, forumLoading]);

  //==================== Event handling
  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handleSignInWithAccount = async (email, password) => {
    try {
      const data = {
        email: email,
        password: password,
      };
      const rs = await userToken(data);
      const { token } = rs;

      if (token) {
        navigate("/");
        setAuthToken(token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    // If user login with firebase auth
    if (auth) {
      signOut(auth);
    }
    userAuth(userInfo); // Set User status = false
    setUserInfo("");
    localStorage.removeItem("userLogin");
    localStorage.removeItem("token");
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

  const handleCartPay = (
    cartDetailList,
    setOpenCartAlert,
    handleCloseCartModal
  ) => {
    if (cartDetailList.length === 0) {
      console.log("Cart empty");
      setOpenCartAlert(true);
    } else {
      handleCloseCartModal();
      navigate("pay");
    }
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

      // console.log(cartList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPost = (setOpenLoginAlert, handleShowCreatePost) => {
    // User not login
    if (Object.keys(userInfo).length === 0) {
      setOpenLoginAlert(true);
    } else {
      handleShowCreatePost(true);
    }
  };

  const handleConfirmPost = (
    userInfo,
    targetProduct,
    commentValue,
    ratingValue,
    handleCloseCreatePost,
    setCommentValue,
    setRatingValue,
    setOpenSuccessPostAlert
  ) => {
    if (userInfo && targetProduct && commentValue !== "") {
      const data = {
        user_email: userInfo.email,
        product_id: targetProduct.id,
        content: commentValue,
        rating: ratingValue,
      };
      if (data) {
        createNewPost(data);
        handleCloseCreatePost();
        setCommentValue("");
        setRatingValue(3);
        setOpenSuccessPostAlert(true);
      }
    }
  };

  const handleSearchProduct = () => {
    const productSearch = productList.filter((item) => {
      return item.name.toUpperCase().includes(searchProduct.toUpperCase());
    });

    setSearchProductList(productSearch);

    navigate("/search");
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
        handleViewProductDetail={handleViewProductDetail}
        getCartByUser={getCartByUser}
        getPostByUser={getPostByUser}
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        handleSearchProduct={handleSearchProduct}
      />
      <Routes>
        <Route
          path="/login"
          element={
            <UserLogin
              userInfo={userInfo}
              handleSignInWithGoogle={handleSignInWithGoogle}
              handleSignInWithAccount={handleSignInWithAccount}
            />
          }
        />
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
        <Route
          path="/forum"
          element={
            <Forum
              userInfo={userInfo}
              userDetail={userDetail}
              productList={productList}
              randomUniqueArray={randomUniqueArray}
              getRandomID={getRandomID}
              handleViewProductDetail={handleViewProductDetail}
              forumLoading={forumLoading}
              postList={postList}
              allUserList={allUserList}
            />
          }
        />
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
              handleConfirmPost={handleConfirmPost}
              loading={loading}
              setLoading={setLoading}
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
        <Route
          path="/profile"
          element={
            <Profile
              userInfo={userInfo}
              userDetail={userDetail}
              userCart={userCart}
              getRandomID={getRandomID}
              handleViewProductDetail={handleViewProductDetail}
              userPost={userPost}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              searchProduct={searchProduct}
              searchProductList={searchProductList}
              getRandomID={getRandomID}
              handleViewProductDetail={handleViewProductDetail}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
