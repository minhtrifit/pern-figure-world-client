import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Search, Menu } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";

const MyNav = (props) => {
  const { handleSignInWithGoogle, handleLogOut, userInfo } = props;

  if (Object.keys(userInfo).length !== 0) {
    console.log("Check from nav:", userInfo);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">FigureWorld</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Trang chủ</Nav.Link>
            <Nav.Link href="#forum">Diễn đàn</Nav.Link>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">
                <Search />
              </Button>
            </Form>
          </Nav>
          {Object.keys(userInfo).length === 0 ? (
            <Button
              variant="primary"
              onClick={(e) => {
                handleSignInWithGoogle();
              }}
            >
              Đăng nhập
            </Button>
          ) : (
            <Stack direction="row" spacing={2}>
              {/* <Typography mt={1}>{userInfo.displayName}</Typography> */}
              <Avatar alt={userInfo.uid} src={userInfo.photoURL} />
              <DropdownButton
                id="dropdown-basic-button"
                title=<Menu />
                align="start"
              >
                <Dropdown.Item href="#profile">Trang cá nhân</Dropdown.Item>
              </DropdownButton>
              <Button
                variant="danger"
                onClick={(e) => {
                  handleLogOut();
                }}
              >
                Đăng xuất
              </Button>
            </Stack>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
