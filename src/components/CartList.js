import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  Grid,
  Box,
  Typography,
  Button as MuiButton,
  Stack,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const CartList = (props) => {
  const {
    showCartModal,
    setShowCartModal,
    cartDetailList,
    getRandomID,
    handleDeleteCartItem,
    handleCartPay,
    handleViewProductDetail,
  } = props;

  if (cartDetailList.length !== 0) {
    // console.log(cartDetailList);
  }

  const [openCartAlert, setOpenCartAlert] = useState(false);

  const handleClose = () => setShowCartModal(false);

  const handleCloseCartAlert = () => {
    setOpenCartAlert(false);
  };

  return (
    <>
      <Snackbar
        open={openCartAlert}
        autoHideDuration={6000}
        onClose={handleCloseCartAlert}
      >
        <Alert
          onClose={handleCloseCartAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Thêm sản phẩm vào giỏ hàng trước khi thanh toán
        </Alert>
      </Snackbar>
      <Modal
        show={showCartModal}
        onHide={handleClose}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Giỏ hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartDetailList.length !== 0 ? (
            <Grid container spacing={2} columns={{ xs: 12 }}>
              {cartDetailList &&
                cartDetailList.map((item) => {
                  return (
                    <Grid item xs={12} key={getRandomID(10000, 99999)}>
                      <Paper elevation={0}>
                        <Box p={2}>
                          <Stack direction="row" spacing={2}>
                            <Box
                              sx={{
                                width: "80px",
                                minWidth: "80px",
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
                                <Typography fontSize={14} fontWeight={700}>
                                  {item.name}
                                </Typography>
                                <Typography fontSize={14}>
                                  Số lượng: {item.amount}
                                </Typography>
                                <Typography fontSize={14}>
                                  Giá: {item.price}đ
                                </Typography>
                              </Box>
                              <Stack direction="row" spacing={2}>
                                <MuiButton
                                  variant="contained"
                                  color="primary"
                                  onClick={(e) => {
                                    handleViewProductDetail(item.product_id);
                                    setShowCartModal(false);
                                  }}
                                >
                                  Xem chi tiết
                                </MuiButton>
                                <MuiButton
                                  variant="contained"
                                  color="error"
                                  onClick={(e) => {
                                    handleDeleteCartItem(item);
                                  }}
                                >
                                  Xóa sản phẩm
                                </MuiButton>
                              </Stack>
                            </Box>
                          </Stack>
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          ) : (
            "Bạn chưa thêm sản phẩm nào"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={(e) => {
              handleCartPay(cartDetailList, setOpenCartAlert, handleClose);
            }}
          >
            Thanh toán
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartList;
