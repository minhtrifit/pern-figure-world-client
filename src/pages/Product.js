import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box, Breadcrumbs } from "@mui/material";
import { NavLink } from "react-router-dom";
import ProductView from "../components/ProductView";
import ProductDetail from "../components/ProductDetail";
import RecommendProducts from "../components/RecommendProducts/RecommendProducts";
import MyFooter from "../components/MyFooter";
import Loading from "../components/Loading";

const Product = (props) => {
  const {
    productList,
    userInfo,
    getRandomID,
    randomUniqueArray,
    handleViewProductDetail,
    myLocation,
    handleAddCart,
    handleAddPost,
    loading,
    setLoading,
  } = props;
  const { id } = useParams();
  const [targetProduct, setTargetProduct] = useState({});
  const [recommendList, setRecommendList] = useState([]);

  //==================== Page config
  // document.title = "Figure World | Chi tiết sản phẩm";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //==================== Get detail product
  useEffect(() => {
    const filterProduct = productList.filter((item) => {
      return item.id === parseInt(id);
    });

    // console.log(filterProduct);

    const [data] = filterProduct;
    setTargetProduct(data);
  }, [productList, id]);

  //==================== Get random recommend list

  useEffect(() => {
    if (productList && targetProduct && loading) {
      let tempList = [];
      let randomArr = [];

      do {
        randomArr = randomUniqueArray(5, 10);
      } while (randomArr.includes(targetProduct.id));

      for (var i = 0; i < randomArr.length; ++i) {
        for (var j = 0; j < productList.length; ++j) {
          if (productList[j].id === randomArr[i]) {
            tempList.push(productList[j]);
          }
        }
      }

      // console.log(randomArr, tempList);
      setRecommendList(tempList);
    }
  }, [productList, randomUniqueArray, targetProduct, loading]);

  return (
    <>
      {loading ? (
        <Loading title="Đang tải sản phẩm..." />
      ) : (
        <>
          <Box mb={3}>
            <Box
              pl={5}
              pt={1}
              pb={1}
              sx={{
                backgroundColor: "#e9ecef",
              }}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <NavLink
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "gray",
                    fontSize: 14,
                  }}
                >
                  Trang chủ
                </NavLink>
                <Typography color="text.primary" fontSize={14}>
                  Sản phẩm
                </Typography>
                <Typography color="text.primary" fontSize={14}>
                  {targetProduct ? targetProduct.name : "unknown"} Figure
                </Typography>
              </Breadcrumbs>
            </Box>
            <Grid
              container
              columns={{ xs: 3, sm: 12 }}
              mt={5}
              justifyContent="center"
            >
              <Grid item xs={3.25} /*bgcolor="red"*/>
                <ProductView
                  targetProduct={targetProduct}
                  myLocation={myLocation}
                />
              </Grid>
              <Grid item xs={6} /*bgcolor="green"*/>
                <ProductDetail
                  targetProduct={targetProduct}
                  userInfo={userInfo}
                  handleAddCart={handleAddCart}
                  handleAddPost={handleAddPost}
                />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2} mb={2}>
            <Typography
              mt={5}
              mb={5}
              textAlign="center"
              fontSize={25}
              fontWeight={500}
            >
              CÓ THỂ BẠN CŨNG THÍCH
            </Typography>
            <RecommendProducts
              recommendList={recommendList}
              getRandomID={getRandomID}
              handleViewProductDetail={handleViewProductDetail}
              setLoading={setLoading}
            />
          </Box>
          <MyFooter />
        </>
      )}
    </>
  );
};

export default Product;
