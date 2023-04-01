import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
// import MyFooter from "../components/MyFooter";

const Forum = (props) => {
  const { userDetail } = props;
  const posterList = ["1.png", "2.png", "3.png"];
  const [posterIndex, setPosterIndex] = useState(0);

  useEffect(() => {
    if (Object.keys(userDetail).length !== 0) {
      console.log(userDetail);
    }
  }, [userDetail]);

  useEffect(() => {
    const countId = setInterval(() => {
      if (posterIndex < posterList.length - 1) {
        setPosterIndex((prev) => prev + 1);
      } else {
        setPosterIndex(0);
      }
      // console.log(posterIndex);
    }, 5000);

    return () => {
      clearInterval(countId);
    };
  }, [posterIndex, posterList.length]);

  return (
    <>
      <Grid
        container
        columns={{ xs: 5, md: 10 }}
        justifyContent="center"
        mt={5}
        mb={3}
      >
        <Grid item xs={2.5}>
          <Box
            position="fixed"
            left="0"
            ml={3}
            sx={{
              width: "20vw",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Paper elevation={2}>
              <Box
                padding={2}
                sx={{
                  height: "80vh",
                }}
              >
                {Object.keys(userDetail).length !== 0 ? (
                  <>
                    <Box
                      // bgcolor="red"
                      sx={{
                        width: "100px",
                        margin: "0 auto",
                      }}
                    >
                      <img
                        src={userDetail.photo_url}
                        alt={userDetail.uid}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "100%",
                        }}
                      />
                    </Box>
                    <Box mt={3} ml={2}>
                      <Typography fontSize={15}>
                        Tên người dùng: {userDetail.display_name}
                      </Typography>
                      <Typography fontSize={15}>
                        Email: {userDetail.email}
                      </Typography>
                      {userDetail.role === "user" && (
                        <Typography
                          fontSize={15}
                          fontWeight={500}
                          color="green"
                        >
                          Vai trò: Thành viên
                        </Typography>
                      )}
                      {userDetail.role === "admin" && (
                        <Typography fontSize={15} fontWeight={500} color="red">
                          Vai trò: Quản trị viên
                        </Typography>
                      )}
                    </Box>
                    <Box margin="50px auto">
                      <Typography
                        textAlign="center"
                        fontSize={20}
                        fontWeight={700}
                        color="primary"
                        // sx={{
                        //   "&:hover": {
                        //     cursor: "pointer",
                        //     color: "red",
                        //   },
                        // }}
                      >
                        SẢN PHẨM QUAN TÂM
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Box
                    mt="50%"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography textAlign="center" fontWeight={500} mb={2}>
                      Đăng nhập để xem thông tin cá nhân
                    </Typography>
                    <AccountCircle sx={{ fontSize: 50 }} />
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box
            bgcolor="blue"
            sx={{
              height: "800px",
            }}
          >
            456
          </Box>
        </Grid>
        <Grid item xs={2.5}>
          <Box
            position="fixed"
            right="0"
            mr={3}
            sx={{
              width: "18vw",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Box>
              <img
                src={`./long poster/${posterList[posterIndex]}`}
                alt={posterList[posterIndex]}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* <MyFooter /> */}
    </>
  );
};

export default Forum;
