import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  Grid,
  Box,
  Typography,
  Button as MuiButton,
  Stack,
  Paper,
} from "@mui/material";

const CartList = (props) => {
  const {
    showCartModal,
    setShowCartModal,
    cartDetailList,
    getRandomID,
    handleDeleteCartItem,
    handleCartPay,
  } = props;

  if (cartDetailList.length !== 0) {
    // console.log(cartDetailList);
  }

  const handleClose = () => setShowCartModal(false);

  return (
    <Modal show={showCartModal} onHide={handleClose} dialogClassName="modal-lg">
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
                    <Paper elevation={2}>
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
                            <MuiButton
                              variant="contained"
                              color="error"
                              onClick={(e) => {
                                handleDeleteCartItem(item);
                              }}
                            >
                              Xóa sản phẩm
                            </MuiButton>
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
            handleCartPay(handleClose);
          }}
        >
          Thanh toán
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartList;
