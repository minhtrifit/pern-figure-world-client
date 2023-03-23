import { Grid, Box, Paper } from "@mui/material";
import Banner from "../components/Banner/Banner";
import HomeLeft from "../components/HomeLeft";
import HomeRight from "../components/HomeRight";

const Home = (props) => {
  const {
    getRandomID,
    productList,
    productListPerPage,
    handleChangeProductPag,
    productitleref,
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
              productitleref={productitleref}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
