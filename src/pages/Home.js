import { Grid, Box, Paper } from "@mui/material";
import Banner from "../components/Banner/Banner";
import HomeLeft from "../components/HomeLeft";
import HomeRight from "../components/HomeRight";
import MyContent from "../components/MyContent";
import MyFooter from "../components/MyFooter";

const Home = (props) => {
  const {
    getRandomID,
    productList,
    productListPerPage,
    handleChangeProductPag,
    productListPageCount,
    productitleref,
    handleViewProductDetail,
  } = props;

  return (
    <>
      <Banner />
      <Grid
        container
        spacing={1}
        p={3}
        mt={1}
        mb={1}
        justifyContent="center"
        // alignItems="center"
        columns={{ xs: 4, sm: 11 }}
      >
        <Grid item xs={2.5}>
          <Paper elevation={1} sx={{ display: { xs: "none", sm: "block" } }}>
            <HomeLeft getRandomID={getRandomID} productList={productList} />
          </Paper>
        </Grid>
        <Grid item xs={4} sm={8}>
          <Box>
            <HomeRight
              getRandomID={getRandomID}
              productList={productList}
              productListPerPage={productListPerPage}
              handleChangeProductPag={handleChangeProductPag}
              productListPageCount={productListPageCount}
              productitleref={productitleref}
              handleViewProductDetail={handleViewProductDetail}
            />
          </Box>
        </Grid>
      </Grid>
      <MyContent />
      <MyFooter />
    </>
  );
};

export default Home;
