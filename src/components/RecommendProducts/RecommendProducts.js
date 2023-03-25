import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./RecommendProducts.scss";
import ProductCard from "../ProductCard/ProductCard";

const RecommendProducts = (props) => {
  const { recommendList, getRandomID, handleViewProductDetail } = props;

  // console.log(recommendList);

  return (
    <Box
      sx={{
        // backgroundColor: "red",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <Swiper
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        spaceBetween={10}
        pagination={{
          type: "progressbar",
          clickable: true,
        }}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
      >
        {recommendList &&
          recommendList.map((item) => {
            return (
              <SwiperSlide key={getRandomID(10000, 99999)}>
                <ProductCard
                  product={item}
                  handleViewProductDetail={handleViewProductDetail}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Box>
  );
};

export default RecommendProducts;