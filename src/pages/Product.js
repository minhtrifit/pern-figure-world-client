import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box, Breadcrumbs } from "@mui/material";
import { NavLink } from "react-router-dom";
import ProductView from "../components/ProductView";
import ProductDetail from "../components/ProductDetail";
import MyFooter from "../components/MyFooter";

const Product = (props) => {
  const { productList, userInfo } = props;
  const { id } = useParams();
  const [targetProduct, setTargetProduct] = useState({});

  //==================== Go to top page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //==================== Get detail product
  useEffect(() => {
    const filterProduct = productList.filter((item) => {
      return item.id === parseInt(id);
    });

    const [data] = filterProduct;
    setTargetProduct(data);
  }, [productList, id]);

  return (
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
            <ProductView targetProduct={targetProduct} />
          </Grid>
          <Grid item xs={6} /*bgcolor="green"*/>
            <ProductDetail targetProduct={targetProduct} userInfo={userInfo} />
          </Grid>
        </Grid>
      </Box>
      <MyFooter />
    </>
  );
};

export default Product;
