import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
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
import Modal from "react-bootstrap/Modal";
import MyFooter from "../components/MyFooter";
import Loading from "../components/Loading";

const Pay = (props) => {
  const {
    userInfo,
    cartList,
    cartDetailList,
    handleViewProductDetail,
    getRandomID,
    handleConfirmCart,
    getDay,
  } = props;

  // console.log(Object.keys(userInfo).length);

  let navigate = useNavigate();

  const [totalCost, setTotalCost] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [loadingSuccess, setLoadingSuccess] = useState(false);

  // Confirm modal event handling
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //==================== Count total pay
  useEffect(() => {
    const addPrice = (total, currentValue) => {
      return total + currentValue.price;
    };

    const sum = cartList.reduce(addPrice, 0);

    setTotalCost(sum);
  }, [cartList]);

  //==================== Loading pay
  useEffect(() => {
    // console.log(loadingSuccess);

    if (loadingSuccess) {
      setTimeout(() => {
        setLoadingSuccess(!loadingSuccess);
      }, 2000);
    }
  }, [loadingSuccess]);

  const handlePay = (cartList) => {
    handleConfirmCart(cartList);
    handleCloseConfirm();
    setLoadingSuccess(true);
    setPaySuccess(!paySuccess);
  };

  return (
    <>
      {Object.keys(userInfo).length === 0 ? (
        <Navigate replace to={"/"} />
      ) : (
        <>
          <Modal show={showConfirm} onHide={handleCloseConfirm}>
            <Modal.Header closeButton>
              <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>Xác nhận đặt hàng ?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleCloseConfirm}>
                Đóng
              </Button>
              <Button
                variant="success"
                onClick={(e) => {
                  handlePay(cartList);
                }}
              >
                Đồng ý
              </Button>
            </Modal.Footer>
          </Modal>
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
          {!paySuccess ? (
            <>
              <Box
                sx={{
                  width: {
                    xs: "90%",
                    sm: "80%",
                    md: "50%",
                  },
                  margin: "50px auto",
                  // backgroundColor: "red",
                }}
              >
                <Paper elevation={2}>
                  <Stack p={3}>
                    <Typography
                      fontSize={25}
                      fontWeight={700}
                      textAlign="center"
                    >
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
                    >
                      Ngày đặt mua: {getDay()}
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
                    <Grid
                      container
                      columns={{ xs: 12 }}
                      spacing={3}
                      justifyContent="center"
                    >
                      {cartDetailList &&
                        cartDetailList.map((item) => {
                          return (
                            <Grid item xs={12} key={getRandomID(10000, 99999)}>
                              <Paper elevation={0}>
                                <Box>
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
                                              handleViewProductDetail(
                                                item.product_id
                                              )
                                            }
                                          >
                                            Xem chi tiết
                                          </Button>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Stack>
                                </Box>
                              </Paper>
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
                        Tổng tiền: {totalCost}đ
                      </Typography>
                      <Button
                        variant="warning"
                        onClick={(e) => {
                          handleShowConfirm();
                        }}
                      >
                        Đặt hàng
                      </Button>
                    </Box>
                  </Stack>
                </Paper>
              </Box>
              <MyFooter />
            </>
          ) : (
            <>
              {loadingSuccess ? (
                <Loading title="Đang tiến hành thanh toán..." />
              ) : (
                <>
                  <Box
                    sx={{
                      width: {
                        xs: "90%",
                        sm: "80%",
                        md: "50%",
                      },
                      margin: "50px auto",
                      // backgroundColor: "red",
                    }}
                  >
                    <Paper elevation={2}>
                      <Box
                        padding={3}
                        sx={
                          {
                            // minHeight: "50vh",
                          }
                        }
                      >
                        <div>
                          <div className="mb-4 text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              color="green"
                              width="75"
                              height="75"
                              fill="currentColor"
                              className="bi bi-check-circle-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                          </div>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              // backgroundColor: "red",
                            }}
                          >
                            <Typography
                              color="green"
                              fontSize={30}
                              fontWeight={700}
                              mb={2}
                            >
                              Đặt hàng thành công!
                            </Typography>
                            <Button
                              variant="warning"
                              onClick={(e) => {
                                navigate("/");
                                setPaySuccess(false);
                              }}
                            >
                              Quay lại trang chủ
                            </Button>
                          </Box>
                        </div>
                      </Box>
                    </Paper>
                  </Box>
                  <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
                    <MyFooter />
                  </Box>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Pay;
