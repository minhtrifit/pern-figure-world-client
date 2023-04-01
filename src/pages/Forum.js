import { useEffect, useCallback, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Avatar,
  Rating,
  styled,
} from "@mui/material";
import { AccountCircle, Favorite, FavoriteBorder } from "@mui/icons-material";
import Loading from "../components/Loading";
import { InputGroup, Modal, Form, Button as BSButton } from "react-bootstrap";
import { Description } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import MyFooter from "../components/MyFooter";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const Forum = (props) => {
  const {
    userDetail,
    productList,
    randomUniqueArray,
    getRandomID,
    handleViewProductDetail,
    forumLoading,
    postList,
    allUserList,
  } = props;
  const posterList = ["1.png", "2.png", "3.png"];
  const [posterIndex, setPosterIndex] = useState(0);
  const [recommendList, setRecommendList] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCloseCreatePostModal = () => setShowCreatePost(false);
  const handleShowCreatePostModal = () => setShowCreatePost(true);

  let navigate = useNavigate();

  // console.log(postList);

  //==================== Get target product for each post

  const getTargetProduct = (checkId, list) => {
    for (var i = 0; i < list.length; ++i) {
      if (list[i].id === checkId) return list[i];
    }
  };

  //==================== Get target user for each post

  const getTargetUser = (checkEmail, list) => {
    for (var i = 0; i < list.length; ++i) {
      if (list[i].email === checkEmail) return list[i];
    }
  };

  //==================== Right poster event

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

  //==================== Get random recommend list

  const getRemmendList = useCallback(() => {
    if (productList.length !== 0 && forumLoading) {
      let tempList = [];
      let randomArr = [];

      const maxLength = productList.length;

      if (maxLength) {
        randomArr = randomUniqueArray(2, maxLength);
      }

      for (var i = 0; i < randomArr.length; ++i) {
        for (var j = 0; j < productList.length; ++j) {
          if (productList[j].id === randomArr[i]) {
            tempList.push(productList[j]);
          }
        }
      }

      setRecommendList(tempList);
    }
  }, [productList, randomUniqueArray, forumLoading]);

  useEffect(() => {
    getRemmendList();
  }, [getRemmendList]);

  return (
    <>
      {forumLoading ? (
        <Loading title="Đang tải diễn đàn..." />
      ) : (
        <>
          <Modal
            show={showCreatePost}
            onHide={handleCloseCreatePostModal}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Tạo bài viết</Modal.Title>
            </Modal.Header>
            <Modal.Body>Comming soon...</Modal.Body>
            <Modal.Footer>
              <BSButton
                variant="secondary"
                onClick={handleCloseCreatePostModal}
              >
                Đóng
              </BSButton>
              <BSButton variant="primary">Tạo</BSButton>
            </Modal.Footer>
          </Modal>
          <Grid
            container
            columns={{ xs: 5, md: 10 }}
            justifyContent="center"
            mt={5}
            mb={3}
            // bgcolor="red"
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
                  <Box padding={2}>
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
                          <Typography fontSize={15} textAlign="center">
                            Tên người dùng: {userDetail.display_name}
                          </Typography>
                          {userDetail.role === "user" && (
                            <Typography
                              fontSize={15}
                              fontWeight={500}
                              color="green"
                              textAlign="center"
                            >
                              Vai trò: Thành viên
                            </Typography>
                          )}
                          {userDetail.role === "admin" && (
                            <Typography
                              fontSize={15}
                              fontWeight={500}
                              color="red"
                            >
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
                          >
                            SẢN PHẨM GỢI Ý
                          </Typography>
                          <Stack spacing={2} mt={2}>
                            {recommendList &&
                              recommendList.map((product) => {
                                return (
                                  <Box
                                    // bgcolor="blue"
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                    key={getRandomID(10000, 99999)}
                                  >
                                    <Typography
                                      fontSize={14}
                                      mb={2}
                                      textAlign="center"
                                    >
                                      {product.name}
                                    </Typography>
                                    <Stack
                                      direction="row"
                                      // bgcolor="red"
                                      justifyContent="space-between"
                                      margin="0 auto"
                                      // width="100%"
                                      sx={{
                                        width: {
                                          md: "100%",
                                          lg: "80%",
                                          xl: "70%",
                                        },
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: "25%",
                                          minWidth: "25%",
                                        }}
                                      >
                                        <img
                                          src={product.photo_url[0]}
                                          alt={product.name}
                                          width="100%"
                                        />
                                      </Box>
                                      <Box margin="auto 0">
                                        <Button
                                          variant="contained"
                                          color="secondary"
                                          onClick={(e) => {
                                            handleViewProductDetail(product.id);
                                          }}
                                        >
                                          Xem chi tiết
                                        </Button>
                                      </Box>
                                    </Stack>
                                  </Box>
                                );
                              })}
                          </Stack>
                        </Box>
                      </>
                    ) : (
                      <Box
                        mt="60%"
                        mb="60%"
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
                // bgcolor="blue"
                pl={2}
                pr={2}
                // sx={{
                //   height: "800px",
                // }}
              >
                <Stack spacing={3}>
                  <Paper>
                    <Box p={2}>
                      <Stack direction="row" spacing={3}>
                        <Avatar
                          alt={userDetail.display_name}
                          src={userDetail.photo_url}
                        />
                        <InputGroup className="mb-3">
                          <Form.Control
                            placeholder="Tạo bài viết về ý kiến của bạn?"
                            onClick={(e) => {
                              handleShowCreatePostModal();
                            }}
                          />
                        </InputGroup>
                      </Stack>
                      <Box pt={1}>
                        <Button
                          variant="contained"
                          onClick={(e) => {
                            navigate("/posts");
                          }}
                        >
                          <Description sx={{ fontSize: 20 }} />
                          <Typography ml={2} fontSize={12} fontWeight={700}>
                            Bài viết của bạn
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                  {postList &&
                    postList.map((post) => {
                      const targetProduct = getTargetProduct(
                        post.product_id,
                        productList
                      );

                      const targetUser = getTargetUser(
                        post.user_email,
                        allUserList
                      );

                      return (
                        <Paper key={getRandomID(10000, 99999)}>
                          <Box p={2}>
                            <Stack direction="row" alignItems="center">
                              <Avatar
                                alt={targetUser.uid}
                                src={targetUser.photo_url}
                              />
                              <Typography ml={2} fontSize={15} fontWeight={700}>
                                {targetUser.display_name}
                              </Typography>
                            </Stack>
                            <Stack direction="row" mt={2} spacing={2}>
                              <Box
                                sx={{
                                  width: "20%",
                                  minWidth: "20%",
                                }}
                              >
                                <img
                                  src={targetProduct.photo_url[0]}
                                  alt={targetProduct.name}
                                  style={{ width: "100%" }}
                                />
                              </Box>
                              <Box>
                                <Typography fontSize={20} color="gray">
                                  Đánh giá sản phẩm: {targetProduct.name}
                                </Typography>
                                <StyledRating
                                  value={post.rating}
                                  icon={<Favorite fontSize="inherit" />}
                                  emptyIcon={
                                    <FavoriteBorder fontSize="inherit" />
                                  }
                                />
                                <Typography fontSize={15} mt={2} mb={5}>
                                  {post.content}
                                </Typography>
                                <BSButton
                                  type="button"
                                  className="btn btn-warning"
                                  onClick={(e) => {
                                    handleViewProductDetail(targetProduct.id);
                                  }}
                                >
                                  Xem chi tiết
                                </BSButton>
                              </Box>
                            </Stack>
                          </Box>
                        </Paper>
                      );
                    })}
                </Stack>
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
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  <Box>
                    <img
                      src={`./long poster/${posterList[posterIndex]}`}
                      alt={posterList[posterIndex]}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                      }}
                    />
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
          {/* <MyFooter /> */}
        </>
      )}
    </>
  );
};

export default Forum;
