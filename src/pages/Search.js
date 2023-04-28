import React from "react";
import { Paper, Box, Typography, Stack } from "@mui/material";
import { Button } from "react-bootstrap";
import MyFooter from "../components/MyFooter";

const Search = (props) => {
  const {
    searchProduct,
    searchProductList,
    getRandomID,
    handleViewProductDetail,
  } = props;

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          width: {
            xs: "95%",
            md: "60%",
          },
          margin: "50px auto",
        }}
      >
        <Box p={2}>
          <Typography variant="h3" fontSize={25} fontWeight={500} mb={2}>
            Kết quả tìm kiếm cho: {searchProduct}
          </Typography>
          {searchProductList &&
            searchProductList.map((item) => {
              return (
                <Stack key={getRandomID(10000, 99999)} mb={2} direction="row">
                  <Box sx={{ width: "20%" }}>
                    <img
                      alt={item.name}
                      src={item.photo_url[0]}
                      style={{ width: "100%" }}
                    />
                  </Box>
                  <Stack ml={2} width="80%">
                    <Typography
                      variant="p"
                      fontSize={20}
                      fontWeight={500}
                      color="gray"
                      mb={2}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="p" fontSize={18} color="red" mb={2}>
                      {item.price}đ
                    </Typography>
                    <Typography variant="p" fontSize={18} mb={2}>
                      Hãng sản xuất: {item.owner}
                    </Typography>
                    <Typography variant="p" fontSize={18} mb={2}>
                      Danh mục: {item.series}
                    </Typography>
                    <Button
                      type="button"
                      className="btn btn-warning"
                      style={{
                        width: "150px",
                      }}
                      onClick={(e) => {
                        handleViewProductDetail(item.id);
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </Stack>
                </Stack>
              );
            })}
        </Box>
      </Paper>
      <MyFooter />
    </>
  );
};

export default Search;
