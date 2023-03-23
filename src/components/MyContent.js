import { Box, Grid, Typography } from "@mui/material";

const MyContent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e9ecef",
      }}
    >
      <Grid container columns={{ xs: 5, sm: 12 }} justifyContent="center">
        <Grid item xs={5}>
          <Box
            padding={3}
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              alt="content1"
              src="./img/img1.png"
              style={{
                width: "100%",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box
            padding={5}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                fontSize={40}
                fontWeight={700}
                textAlign="center"
                mb={2}
              >
                Về chúng tôi
              </Typography>
              <Typography textAlign="justify" fontWeight={500} mb={2}>
                Figure World shop chuyên cung cấp các sản phẩm mô hình anime
                tĩnh, khớp động và mô hình nhựa lắp ráp Gundam, KIT nữ... cùng
                các anime goods, tạp chí có xuất xứ Nhật Bản.
              </Typography>
              <Typography
                textAlign="justify"
                fontSize={15}
                fontWeight={300}
                mb={2}
              >
                Ngoài các sản phẩm có sẵn, JH Figure còn cung cấp các dịch vụ
                sau:
              </Typography>
              <Typography
                textAlign="justify"
                fontSize={15}
                fontWeight={300}
                mb={2}
              >
                ※　Dịch vụ order các sản phẩm anime sắp ra mắt hoặc đang lưu
                hành tại Nhật Bản, với thời gian vận chuyển cam kết trong vòng
                10-21 ngày.
              </Typography>
              <Typography
                textAlign="justify"
                fontSize={15}
                fontWeight={300}
                mb={2}
              >
                ※　Dịch vụ thu gom, mua hộ hàng hóa anime từ các website thương
                mại điện tử hợp pháp tại Nhật Bản với giá dịch vụ hợp lý và hệ
                thống báo cáo trạng thái đơn hàng hàng tự động 24/7.
              </Typography>
              <Typography
                textAlign="justify"
                fontSize={15}
                fontWeight={300}
                mb={2}
              >
                ※　Hợp tác nhập sỉ và CTV bán lẻ.
              </Typography>
              <Typography textAlign="justify" fontWeight={500} mb={2}>
                Đến với Figure World, bạn sẽ được sở hữu các SẢN PHẨM CHÍNH HÃNG
                NHẬT BẢN với PHONG CÁCH PHỤC VỤ CHUẨN NHẬT BẢN với phương châm
                TRẢI NGHIỆM HOÀN HẢO CỦA KHÁCH HÀNG LÀ TIÊU CHUẨN CƠ BẢN CỦA
                SHOP CHÚNG TÔI.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyContent;
