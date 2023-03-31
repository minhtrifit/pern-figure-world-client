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
  Rating,
  styled,
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
  Modal,
} from "react-bootstrap";
import {
  FiberManualRecord,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const ProductDetail = (props) => {
  const {
    targetProduct,
    userInfo,
    handleAddCart,
    handleAddPost,
    handleConfirmPost,
  } = props;
  const [cartAmount, setCartAmount] = useState(1);
  const [openLoginAlert, setOpenLoginAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [tabValue, setTabValue] = useState("1");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [ratingValue, setRatingValue] = useState(3);
  const [openSuccessPostAlert, setOpenSuccessPostAlert] = useState(false);

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

  const handleCloseCreatePost = () => setShowCreatePost(false);
  const handleShowCreatePost = () => setShowCreatePost(true);

  const handleCloseSuccessPost = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenLoginAlert(false);
    setOpenSuccessPostAlert(false);
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
        <Snackbar
          open={openSuccessPostAlert}
          autoHideDuration={6000}
          onClose={handleCloseSuccessPost}
        >
          <Alert
            onClose={handleCloseSuccessPost}
            severity="success"
            sx={{ width: "100%" }}
          >
            Tạo bài viết thành công
          </Alert>
        </Snackbar>
        <Modal
          show={showCreatePost}
          onHide={(e) => {
            handleCloseCreatePost();
            setCommentValue("");
          }}
          dialogClassName="modal-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Tạo bài viết</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack direction="row">
              <Box
                width="30%"
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                <img
                  src={targetProduct.photo_url[0]}
                  alt={targetProduct.name}
                  width="100%"
                />
              </Box>
              <Box
                pl={3}
                sx={{
                  width: {
                    xs: "100%",
                    md: "70%",
                  },
                }}
              >
                <Typography fontSize={20} fontWeight={700}>
                  Tên sản phẩm: {targetProduct.name}
                </Typography>
                <Box mt={2}>
                  <Typography fontSize={15} fontWeight={300}>
                    Bình luận
                  </Typography>
                  <textarea
                    value={commentValue}
                    placeholder="Bạn nghĩ gì về sản phẩm này?"
                    style={{
                      padding: "10px",
                      width: "100%",
                      height: "100px",
                    }}
                    onChange={(e) => {
                      setCommentValue(e.target.value);
                    }}
                  />
                </Box>
                <Box mt={2}>
                  <Typography fontSize={15} fontWeight={300}>
                    Đánh giá
                  </Typography>
                  <StyledRating
                    name="simple-controlled"
                    value={ratingValue}
                    icon={<Favorite fontSize="inherit" />}
                    emptyIcon={<FavoriteBorder fontSize="inherit" />}
                    onChange={(event, newValue) => {
                      setRatingValue(newValue);
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(e) => {
                handleCloseCreatePost();
                setCommentValue("");
              }}
            >
              Đóng
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                handleConfirmPost(
                  userInfo,
                  targetProduct,
                  commentValue,
                  ratingValue,
                  handleCloseCreatePost,
                  setCommentValue,
                  setRatingValue,
                  setOpenSuccessPostAlert
                );
              }}
            >
              Tạo
            </Button>
          </Modal.Footer>
        </Modal>
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
                handleAddPost(setOpenLoginAlert, handleShowCreatePost);
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
