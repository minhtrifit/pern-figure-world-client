import React from "react";
import {
  Grid,
  Box,
  Breadcrumbs,
  Typography,
  Button,
  Stack,
  Paper,
  TextField,
  Divider,
} from "@mui/material";
import { NavLink, Navigate } from "react-router-dom";
import { Google, Facebook } from "@mui/icons-material";
import MyFooter from "../components/MyFooter";

const UserLogin = (props) => {
  const { userInfo, handleSignInWithGoogle } = props;
  return (
    <>
      {Object.keys(userInfo).length !== 0 ? (
        <Navigate replace to={"/"} />
      ) : (
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
                Đăng nhập
              </Typography>
            </Breadcrumbs>
          </Box>
          <Grid
            container
            justifyContent="center"
            height="600px"
            // bgcolor="red"
            mt={5}
            columns={{ xs: 12, md: 7 }}
          >
            <Grid
              item
              xs={0}
              md={2}
              // bgcolor="red"
              sx={{
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Box
                bgcolor="red"
                // mr={3}
                sx={{
                  width: "300px",
                  minWidth: "300px",
                  height: "400px",
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                <img
                  src="./img/login.png"
                  alt="login poster"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={10}
              md={3}
              // bgcolor="red"
              sx={{
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  width: "100%",
                }}
              >
                <Box padding={2}>
                  <Typography
                    fontSize={25}
                    fontWeight={700}
                    textAlign="center"
                    color="primary"
                  >
                    ĐĂNG NHẬP TÀI KHOẢN
                  </Typography>
                  <Typography fontSize={15} textAlign="center" color="gray">
                    Chọn phương thức đăng nhập
                  </Typography>
                  <Stack
                    spacing={2}
                    margin="30px auto"
                    sx={{
                      width: {
                        xs: "80%",
                        sm: "70%",
                      },
                    }}
                  >
                    <Stack
                      direction="column"
                      justifyContent="center"
                      spacing={2}
                      mb={3}
                    >
                      <TextField label="Tên tài khoản" variant="outlined" />
                      <TextField
                        label="Mật khẩu"
                        type="password"
                        variant="outlined"
                      />
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={(e) => {
                          // handleSignInWithGoogle();
                        }}
                      >
                        <Typography ml={2}>Đăng nhập</Typography>
                      </Button>
                    </Stack>
                    <Stack direction="row" justifyContent="center">
                      <Typography fontWeight={300} mr={1}>
                        Chưa có tài khoản?
                      </Typography>
                      <NavLink
                        to="/register"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        Đăng ký
                      </NavLink>
                    </Stack>
                  </Stack>
                  <Divider
                    sx={{
                      width: "100%",
                      bgcolor: "gray",
                    }}
                  />
                  <Stack
                    spacing={2}
                    margin="30px auto"
                    sx={{
                      width: {
                        xs: "80%",
                        sm: "50%",
                      },
                    }}
                  >
                    <Typography textAlign="center" color="gray">
                      Hoặc
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => {
                        handleSignInWithGoogle();
                      }}
                    >
                      <Google />
                      <Typography ml={2}>Google</Typography>
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        // handleSignInWithGoogle();
                      }}
                    >
                      <Facebook />
                      <Typography ml={2}>Facebook</Typography>
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Box mt={5}>
            <MyFooter />
          </Box>
        </>
      )}
    </>
  );
};

export default UserLogin;
