import { Grid, Box, Paper } from "@mui/material";
import Banner from "../components/Banner/Banner";
import HomeLeft from "../components/HomeLeft";
import HomeRight from "../components/HomeRight";

const Home = (props) => {
  const { productList } = props;

  return (
    <>
      <Banner />
      <Grid
        container
        spacing={3}
        mt={2}
        mb={2}
        justifyContent="center"
        // alignItems="center"
      >
        <Grid item xs={2}>
          <Paper elevation={2}>
            <HomeLeft productList={productList} />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Box bgcolor="blue">
            <HomeRight />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
