import { Typography, Pagination, Stack, Grid } from "@mui/material";
import ProductCard from "./ProductCard/ProductCard";

const HomeRight = (props) => {
  const {
    getRandomID,
    productListPerPage,
    handleChangeProductPag,
    productListPageCount,
    productitleref,
    handleViewProductDetail,
  } = props;

  if (productListPerPage.length !== 0) {
    // console.log("Check from HomeRight:", productListPerPage);
  }

  return (
    <>
      <Typography
        fontSize={25}
        textAlign="center"
        fontWeight={700}
        color="#0d6efd"
        ref={productitleref}
      >
        DANH SÁCH SẢN PHẨM
      </Typography>
      <Grid
        container
        columns={{ xs: 8, sm: 12 }}
        sx={{
          width: { xs: "100%", sm: "800px" },
          margin: "20px auto",
          // backgroundColor: "red",
        }}
      >
        {productListPerPage &&
          productListPerPage.map((product) => {
            return (
              <Grid
                item
                xs={4}
                key={getRandomID(1000, 99999)}
                sx={{
                  padding: { xs: 0, sm: 3 },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ProductCard
                  product={product}
                  handleViewProductDetail={handleViewProductDetail}
                />
              </Grid>
            );
          })}
      </Grid>
      <Stack alignItems="center">
        <Pagination
          count={productListPageCount ? productListPageCount : 1}
          color="primary"
          onClick={(e) => {
            handleChangeProductPag(e.target.innerText, productitleref);
          }}
        />
      </Stack>
    </>
  );
};

export default HomeRight;
