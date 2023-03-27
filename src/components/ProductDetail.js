import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Button as MuiButton,
  Stack,
  Snackbar,
  Alert,
  Tab,
  Grid,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FiberManualRecord } from "@mui/icons-material";

const ProductDetail = (props) => {
  const { targetProduct, userInfo, handleAddCart, handleAddPost } = props;
  const [cartAmount, setCartAmount] = useState(1);
  const [openLoginAlert, setOpenLoginAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [tabValue, setTabValue] = useState("1");

  // console.log(targetProduct);

  useEffect(() => {
    setCartAmount(1);
  }, [targetProduct]);

  if (Object.keys(userInfo).length !== 0) {
    // console.log("Check from ProductDetail:", userInfo);
  }

  const handleChangeCartAmount = (target) => {
    let tempAmount = cartAmount;

    if (target.innerText === "+") {
      setCartAmount(++tempAmount);
    } else {
      if (cartAmount > 1) {
        setCartAmount(--tempAmount);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenLoginAlert(false);
    setOpenSuccessAlert(false);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <List
        component="nav"
        sx={{
          width: "100%",
        }}
      >
        <Snackbar
          open={openLoginAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Vui lòng đăng nhập trước khi thực hiện
          </Alert>
        </Snackbar>
        <Snackbar
          open={openSuccessAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Thêm vào giỏ hàng thành công
          </Alert>
        </Snackbar>
        <ListItem divider>
          <Typography variant="h5" fontSize={20} fontWeight={700}>
            {targetProduct ? targetProduct.name : "unknown"} Figure
          </Typography>
        </ListItem>
        <ListItem divider>
          <Typography variant="h5" fontSize={20} fontWeight={700} color="red">
            {targetProduct ? `${targetProduct.price}đ` : "unknown"}
          </Typography>
        </ListItem>
        <ListItem divider>
          <Stack>
            <Typography variant="h5" fontSize={15} fontWeight={300}>
              Số lượng sản phẩm trong giỏ hàng
            </Typography>
            <ButtonToolbar className="mt-3 mb-3">
              <ButtonGroup className="me-2">
                <Button
                  variant="primary"
                  onClick={(e) => {
                    handleChangeCartAmount(e.target);
                  }}
                >
                  <Typography
                    component="div"
                    name="remove"
                    fontSize={20}
                    fontWeight={700}
                  >
                    -
                  </Typography>
                </Button>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="remove"
                    placeholder="Amount"
                    value={cartAmount}
                    style={{
                      width: "50px",
                      textAlign: "center",
                      borderRadius: 0,
                    }}
                    disabled
                  />
                </InputGroup>
                <Button
                  variant="primary"
                  name="add"
                  onClick={(e) => {
                    handleChangeCartAmount(e.target);
                  }}
                >
                  <Typography
                    component="div"
                    name="add"
                    fontSize={20}
                    fontWeight={700}
                  >
                    +
                  </Typography>
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Stack>
        </ListItem>
        <ListItem divider>
          <Stack spacing={2} pt={1} pb={2} direction="row">
            <MuiButton
              variant="contained"
              color="error"
              onClick={(e) => {
                handleAddCart(
                  setOpenLoginAlert,
                  setOpenSuccessAlert,
                  targetProduct,
                  cartAmount
                );
              }}
            >
              Thêm vào giỏ hàng
            </MuiButton>
            <MuiButton
              variant="contained"
              color="success"
              onClick={(e) => {
                handleAddPost(setOpenLoginAlert, setOpenSuccessAlert);
              }}
            >
              Tạo bài viết
            </MuiButton>
          </Stack>
        </ListItem>
        <ListItem divider>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChangeTab}
                  aria-label="lab API tabs example"
                >
                  <Tab label="THÔNG TIN SẢN PHẨM" value="1" />
                  <Tab label="CHÍNH SÁCH BÁN HÀNG" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={4}>
                    <Typography fontSize={15} fontWeight={700} color="#e67e22">
                      Tên sản phẩm
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography ml={5} fontSize={15} color="gray">
                      {targetProduct && targetProduct.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={4}>
                    <Typography fontSize={15} fontWeight={700} color="#e67e22">
                      Series
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography ml={5} fontSize={15} color="gray">
                      {targetProduct && targetProduct.series}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={4}>
                    <Typography fontSize={15} fontWeight={700} color="#e67e22">
                      Thương hiệu
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography ml={5} fontSize={15} color="gray">
                      {targetProduct && targetProduct.owner}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography fontSize={15} fontWeight={700} color="#e67e22">
                      Kích thước
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography ml={5} fontSize={15} color="gray">
                      {targetProduct && targetProduct.size}
                    </Typography>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Typography fontSize={13} color="gray" mb={1}>
                  <FiberManualRecord />
                  Cam kết hàng chính hãng 100%
                </Typography>
                <Typography fontSize={13} color="gray" mb={1}>
                  <FiberManualRecord />
                  Đổi trả 1:1 hoặc hỗ trợ sửa chữa lỗi NSX
                </Typography>
                <Typography fontSize={13} color="gray">
                  <FiberManualRecord />
                  Inbox shop nếu cần cung cấp hình ảnh thực tế
                </Typography>
              </TabPanel>
            </TabContext>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};

export default ProductDetail;
