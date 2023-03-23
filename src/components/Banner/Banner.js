import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Banner.scss";

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img alt="banner1" src="./banner/banner1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="banner2" src="./banner/banner2.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="banner3" src="./banner/banner3.png" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
