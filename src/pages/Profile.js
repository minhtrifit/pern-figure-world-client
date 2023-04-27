import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Stack,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import MyFooter from "../components/MyFooter";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Profile = (props) => {
  const {
    userInfo,
    userDetail,
    userCart,
    getRandomID,
    handleViewProductDetail,
  } = props;

  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {Object.keys(userInfo).length === 0 && navigate("/")}
      <Paper
        elevation={2}
        sx={{
          width: {
            xs: "90%",
            md: "60%",
          },
          minHeight: "80vh",
          margin: "50px auto",
        }}
      >
        <Box
          p={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={userInfo.uid}
            src={userInfo.photoURL}
            sx={{ width: 120, height: 120 }}
          />
          <Stack>
            <Typography variant="p" fontSize={25} mt={2}>
              Họ và tên: {userInfo.displayName}
            </Typography>
            <Typography variant="p" fontSize={25} mt={2}>
              Email: {userInfo.email}
            </Typography>
            {userDetail.role === "user" && (
              <Typography fontSize={25} fontWeight={500} mt={2} color="green">
                Vai trò: Thành viên
              </Typography>
            )}
            {userDetail.role === "admin" && (
              <Typography fontSize={25} fontWeight={500} mt={2} color="red">
                Vai trò: Quản trị viên
              </Typography>
            )}
          </Stack>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Lịch sử mua hàng" {...a11yProps(0)} />
              <Tab label="Danh sách bài viết" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {userCart &&
              userCart.map((item) => {
                return (
                  <Box
                    key={getRandomID(10000, 99999)}
                    mt={2}
                    sx={{
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        width: "20%",
                      }}
                    >
                      <img
                        alt={item.name}
                        src={item.photoURL}
                        style={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Stack
                      pl={2}
                      sx={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="p" fontSize={20} fontWeight={500}>
                        {item.name}
                      </Typography>
                      <Typography variant="p" fontSize={18}>
                        Ngày mua: {item.date[0]}
                      </Typography>
                      <Typography variant="p" fontSize={18} color="red">
                        {item.price}đ
                      </Typography>
                      <Typography variant="p" fontSize={18}>
                        Số lượng: {item.amount}
                      </Typography>
                      <Typography variant="p" fontSize={18}>
                        Ngày mua: {item.date[0]}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          width: "150px",
                          margin: "20px 0",
                        }}
                        onClick={(e) => {
                          handleViewProductDetail(item.product_id);
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </Stack>
                  </Box>
                );
              })}
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
        </Box>
      </Paper>
      <MyFooter />
    </>
  );
};

export default Profile;
