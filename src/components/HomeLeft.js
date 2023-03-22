import { Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const filterBySeries = (arr) => {
  let a = [];
  let ans = [];
  a = arr.filter(function (item) {
    return a.includes(item.series) ? "" : a.push(item.series);
  });
  ans = a.map((item) => {
    return item.series;
  });
  return ans;
};

const HomeLeft = (props) => {
  const { productList } = props;
  const filterSeriesList = filterBySeries(productList);
  //   console.log("Check from HomeLeft:", productList);

  return (
    <Box p={3}>
      <Typography variant="h6" fontWeight={500}>
        DANH MỤC SẢN PHẨM
      </Typography>
      {filterSeriesList &&
        filterSeriesList.map((item) => {
          return (
            <Box key={item}>
              <Typography
                sx={{
                  fontSize: 14,
                  paddingTop: 1,
                  "&:hover": {
                    color: "#000",
                  },
                }}
              >
                <NavLink
                  to={`/series/${item}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{
                      color: "gray",
                      "&:hover": {
                        color: "#000",
                      },
                    }}
                  >
                    {item}
                  </Typography>
                </NavLink>
              </Typography>
            </Box>
          );
        })}
    </Box>
  );
};

export default HomeLeft;
