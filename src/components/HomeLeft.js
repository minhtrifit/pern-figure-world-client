import { Typography, Box, List, ListItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Pets } from "@mui/icons-material";

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

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const HomeLeft = (props) => {
  const { getRandomID, productList } = props;
  const filterSeriesList = filterBySeries(productList);
  //   console.log("Check from HomeLeft:", productList);

  return (
    <Box p={1}>
      <Typography
        variant="h6"
        textAlign="center"
        fontWeight={700}
        color="#0d6efd"
      >
        DANH MỤC SẢN PHẨM
      </Typography>
      <List sx={style} component="nav" aria-label="mailbox folders">
        {filterSeriesList &&
          filterSeriesList.map((item, index) => {
            if (index === filterSeriesList.length - 1) {
              return (
                <ListItem button key={getRandomID(1000, 99999)}>
                  <Pets />
                  <NavLink
                    to={`/series/${item}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontSize={13}
                      color="#000"
                      padding={0.5}
                      ml={1}
                    >
                      {item}
                    </Typography>
                  </NavLink>
                </ListItem>
              );
            } else {
              return (
                <ListItem button divider key={item}>
                  <Pets />
                  <NavLink
                    to={`/series/${item}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontSize={13}
                      color="#000"
                      padding={0.5}
                      ml={1}
                    >
                      {item}
                    </Typography>
                  </NavLink>
                </ListItem>
              );
            }
          })}
      </List>
    </Box>
  );
};

export default HomeLeft;
