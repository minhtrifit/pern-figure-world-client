import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Grid,
  Breadcrumbs,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Pay = (props) => {
  const {
    userInfo,
    cartList,
    cartDetailList,
    handleViewProductDetail,
    getRandomID,
  } = props;

  const [totalCost, setTotalCost] = useState(0);

  //   console.log(cartDetailList);

  //==================== Count total pay
  useEffect(() => {
    const addPrice = (total, currentValue) => {
      return total + currentValue.price;
    };

    const sum = cartList.reduce(addPrice, 0);

    setTotalCost(sum);
  }, [cartList]);

  return (
    <>
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
            Xác nhận thanh toán
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          width: {
            xs: "90%",
            sm: "80%",
            md: "60%",
          },
          margin: "50px auto",
          // backgroundColor: "red",
        }}
      >
        <Paper elevation={2}>
          <Stack p={3}>
            <Typography fontSize={25} fontWeight={700} textAlign="center">
              THÔNG TIN ĐƠN HÀNG
            </Typography>
            <Typography
              mb={1}
              sx={{
                fontSize: {
                  xs: 15,
                  sm: 18,
                },
              }}
            >
              Thông tin người nhận: {userInfo.displayName}
            </Typography>
            <Typography
              mb={1}
              sx={{
                fontSize: {
                  xs: 15,
                  sm: 18,
                },
              }}
            >
              Địa chỉ email: {userInfo.email}
            </Typography>
            <Typography
              mb={1}
              sx={{
                fontSize: {
                  xs: 15,
                  sm: 18,
                },
              }}
              fontWeight={500}
              color="primary"
            >
              Danh sách sản phẩm đặt mua:
            </Typography>
            <Grid container columns={{ xs: 12 }} justifyContent="center">
              {cartDetailList &&
                cartDetailList.map((item) => {
                  return (
                    <Grid item xs={8} key={getRandomID(10000, 99999)}>
                      <Stack
                        direction="row"
                        spacing={5}
                        padding={2}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: {
                              xs: "80px",
                              sm: "150px",
                            },
                            minWidth: {
                              xs: "80px",
                              sm: "150px",
                            },
                            //   backgroundColor: "red",
                          }}
                        >
                          <img
                            src={item.photo_url}
                            alt={item.name}
                            style={{
                              width: "100%",
                            }}
                          />
                        </Box>
                        <Box>
                          <Box mb={1}>
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: 14,
                                  sm: 18,
                                },
                              }}
                              fontWeight={700}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: 14,
                                  sm: 18,
                                },
                              }}
                            >
                              Số lượng: {item.amount}
                            </Typography>
                            <Typography
                              color="red"
                              sx={{
                                fontSize: {
                                  xs: 14,
                                  sm: 18,
                                },
                              }}
                            >
                              Giá: {item.price}đ
                            </Typography>
                            <Box mt={2}>
                              <Button
                                variant="primary"
                                onClick={(e) =>
                                  handleViewProductDetail(item.product_id)
                                }
                              >
                                Xem chi tiết
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Stack>
                    </Grid>
                  );
                })}
            </Grid>
            <Box mt={2}>
              <Typography
                mb={2}
                color="green"
                fontWeight={500}
                sx={{
                  fontSize: {
                    xs: 15,
                    sm: 20,
                  },
                }}
              >
                Tổng tiền: {totalCost}
              </Typography>
              <Button variant="warning">Đặt hàng</Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default Pay;
