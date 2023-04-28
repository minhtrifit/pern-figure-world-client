import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  Dropdown,
  ButtonGroup,
  ButtonToolbar,
} from "react-bootstrap";
import { Search, ShoppingCart } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import { Stack, Typography, Badge, Box } from "@mui/material";
import { NavLink, Link, useNavigate } from "react-router-dom";
import CartList from "./CartList";

const MyNav = (props) => {
  const {
    // handleSignInWithGoogle,
    handleLogOut,
    userInfo,
    showCartModal,
    setShowCartModal,
    cartList,
    totalCart,
    cartDetailList,
    getRandomID,
    handleDeleteCartItem,
    handleCartPay,
    handleViewProductDetail,
    getCartByUser,
    getPostByUser,
    searchProduct,
    setSearchProduct,
    handleSearchProduct,
  } = props;

  let navigate = useNavigate();

  // if (Object.keys(userInfo).length !== 0) {
  //   console.log("Check from nav:", userInfo);
  // }

  return (
    <>
      <CartList
        showCartModal={showCartModal}
        setShowCartModal={setShowCartModal}
        cartList={cartList}
        cartDetailList={cartDetailList}
        getRandomID={getRandomID}
        handleDeleteCartItem={handleDeleteCartItem}
        handleCartPay={handleCartPay}
        handleViewProductDetail={handleViewProductDetail}
      />
      <Navbar bg="light" expand="lg" /*sticky="top"*/>
        <Container fluid>
          <Navbar.Brand href="/">FigureWorld</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink
                to="/"
                style={{
                  textDecoration: "none",
                  paddingRight: 20,
                }}
              >
                <Typography
                  mt={1}
                  sx={{
                    color: "gray",
                    "&:hover": {
                      color: "#000",
                    },
                  }}
                >
                  Trang chủ
                </Typography>
              </NavLink>
              <NavLink
                to="/forum"
                style={{
                  textDecoration: "none",
                  paddingRight: 20,
                }}
              >
                <Typography
                  mt={1}
                  sx={{
                    color: "gray",
                    "&:hover": {
                      color: "#000",
                    },
                  }}
                >
                  Diễn đàn
                </Typography>
              </NavLink>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm"
                  className="me-2"
                  aria-label="Search"
                  value={searchProduct}
                  onChange={(e) => {
                    setSearchProduct(e.target.value);
                  }}
                />
                <Button
                  variant="outline-primary"
                  onClick={(e) => {
                    handleSearchProduct();
                  }}
                >
                  <Search />
                </Button>
              </Form>
            </Nav>
            {Object.keys(userInfo).length === 0 ? (
              <Button
                variant="primary"
                onClick={(e) => {
                  // handleSignInWithGoogle();
                  navigate("/login");
                }}
              >
                Đăng nhập
              </Button>
            ) : (
              <Stack direction="row" spacing={2}>
                {/* <Typography mt={1}>{userInfo.displayName}</Typography> */}
                <ButtonToolbar>
                  <ButtonGroup>
                    <Avatar alt={userInfo.uid} src={userInfo.photoURL} />
                  </ButtonGroup>
                  <ButtonGroup className="me-1">
                    <Dropdown align={{ md: "end" }}>
                      <Dropdown.Toggle variant="link"></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to="/profile"
                          onClick={(e) => {
                            getCartByUser();
                            getPostByUser();
                          }}
                        >
                          Trang cá nhân
                        </Dropdown.Item>
                        {/* <Dropdown.Item as={Link} to="/carts">
                          Lịch sử mua hàng
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/posts">
                          Danh sách bài viết
                        </Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Box
                      pl={1}
                      pr={4}
                      mt={1}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={(e) => {
                        setShowCartModal(true);
                      }}
                    >
                      <Badge badgeContent={totalCart} color="primary">
                        <ShoppingCart color="action" />
                      </Badge>
                    </Box>
                  </ButtonGroup>
                  <ButtonGroup className="me-1">
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        handleLogOut();
                      }}
                    >
                      Đăng xuất
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Stack>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNav;
