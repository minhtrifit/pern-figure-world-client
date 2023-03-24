import {
  Box,
  Typography,
  List,
  ListItem,
  Button as MuiButton,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Form,
  InputGroup,
} from "react-bootstrap";

const ProductDetail = (props) => {
  const { targetProduct, userInfo } = props;
  const [cartAmount, setCartAmount] = useState(1);
  const [openLoginAlert, setOpenLoginAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  //   console.log(targetProduct);

  if (Object.keys(userInfo).length !== 0) {
    console.log("Check from ProductDetail:", userInfo);
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

  const handleAddCart = () => {
    // User not login
    if (Object.keys(userInfo).length === 0) {
      setOpenLoginAlert(true);
    } else {
      setOpenSuccessAlert(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenLoginAlert(false);
    setOpenSuccessAlert(false);
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
                handleAddCart();
              }}
            >
              Thêm vào giỏ hàng
            </MuiButton>
            <MuiButton variant="contained" color="success">
              Tạo bài viết
            </MuiButton>
          </Stack>
        </ListItem>
      </List>
    </Box>
  );
};

export default ProductDetail;
