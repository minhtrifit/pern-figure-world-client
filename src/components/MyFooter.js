import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  Place,
  LocalPhone,
  Email,
  Facebook,
  YouTube,
  Instagram,
  GitHub,
} from "@mui/icons-material";

const MyFooter = () => {
  return (
    <Box>
      <Box padding={3}>
        <Grid
          container
          spacing={1}
          columns={{ xs: 4, sm: 12 }}
          justifyContent="center"
        >
          <Grid item xs={4}>
            <Box
              sx={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                margin: "0 auto",
                marginBottom: {
                  xs: 2,
                  sm: 0,
                },
              }}
            >
              <Stack>
                <Typography fontWeight={500} mb={2}>
                  Giới thiệu
                </Typography>
                <Typography fontSize={13} fontWeight={300}>
                  Figure World trang mua sắm trực tuyến các sản phẩm anime chính
                  hãng Nhật Bản & giao lưu cộng đồng wibu Việt Nam.
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: {
                  xs: 2,
                  sm: 0,
                },
              }}
            >
              <Stack>
                <Typography fontWeight={500} mb={2}>
                  Thông tin liên hệ
                </Typography>
                <Typography fontSize={13} fontWeight={300} mb={1}>
                  <Place
                    sx={{
                      marginRight: 1,
                    }}
                  />
                  Quận Tân Bình, TP. Hồ Chí Minh
                </Typography>
                <Typography fontSize={13} fontWeight={300} mb={1}>
                  <LocalPhone
                    sx={{
                      marginRight: 1,
                    }}
                  />
                  0123.567.457
                </Typography>
                <Typography fontSize={13} fontWeight={300} mb={1}>
                  <Email
                    sx={{
                      marginRight: 1,
                    }}
                  />
                  figureworld.shop@gmail.com
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: {
                  xs: 2,
                  sm: 0,
                },
              }}
            >
              <Stack>
                <Typography fontWeight={500} mb={2}>
                  Kết nối
                </Typography>
                <Stack direction="row" spacing={1}>
                  <a
                    href="https://www.google.com"
                    style={{
                      color: "#000",
                    }}
                  >
                    <Facebook sx={{ fontSize: 30 }} />
                  </a>
                  <a
                    href="https://www.google.com"
                    style={{
                      color: "#000",
                    }}
                  >
                    <Instagram sx={{ fontSize: 30 }} />
                  </a>
                  <a
                    href="https://www.google.com"
                    style={{
                      color: "#000",
                    }}
                  >
                    <YouTube sx={{ fontSize: 30 }} />
                  </a>
                  <a
                    href="https://www.google.com"
                    style={{
                      color: "#000",
                    }}
                  >
                    <GitHub sx={{ fontSize: 30 }} />
                  </a>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#e9ecef",
        }}
      />
      <Box padding={3}>
        <Typography textAlign="center" fontWeight={300} fontSize={15}>
          Copyright © 2023 minhtrifit. Powered by FigureWord
        </Typography>
      </Box>
    </Box>
  );
};

export default MyFooter;
