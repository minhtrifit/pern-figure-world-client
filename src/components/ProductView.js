import { Box, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import { LightBox } from "react-lightbox-pack"; // <--- Importing LightBox Pack
import "react-lightbox-pack/dist/index.css";

const ProductView = (props) => {
  const { targetProduct } = props;
  const [toggle, setToggle] = useState(false);
  const [sIndex, setSIndex] = useState(0);
  const [mainProductIndex, setMainProductIndex] = useState(0);
  let data = useMemo(() => [], []);
  let imageSrc = "";

  useMemo(() => {
    if (targetProduct) {
      let imageList = [];
      imageList = targetProduct.photo_url;
      if (imageList) {
        for (var i = 0; i < imageList.length; ++i) {
          const imageData = {
            id: i + 1,
            image: imageList[i],
            title: "test",
            description: "test",
          };
          data.push(imageData);
        }
        // console.log(data);
      }
    }
  }, [data, targetProduct]);

  if (data.length !== 0) {
    imageSrc = data[mainProductIndex].image;
    // console.log(imageSrc);
  }

  const lightBoxHandler = (state, sIndex) => {
    setToggle(state);
    setSIndex(sIndex);
  };

  const handleChangeMainImage = (index) => {
    setMainProductIndex(index);
  };

  return (
    <Box
      sx={{
        width: "90%",
        margin: "0 auto",
        // backgroundColor: "red",
      }}
    >
      <Stack direction="row">
        <Box
          sx={{
            width: "150px",
          }}
        >
          {data &&
            data.map((item, index) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    width: "100%",
                    paddingBottom: 1,
                    paddingRight: 1,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%" }}
                    onClick={() => {
                      handleChangeMainImage(index);
                    }}
                  />
                </Box>
              );
            })}
        </Box>
        <Box
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {targetProduct && (
            <img
              src={imageSrc}
              alt={mainProductIndex}
              style={{ width: "100%" }}
              onClick={(e) => {
                lightBoxHandler(true, mainProductIndex);
              }}
            />
          )}
        </Box>
      </Stack>
      <LightBox
        state={toggle}
        event={lightBoxHandler}
        data={data}
        imageWidth="60vw"
        imageHeight="70vh"
        thumbnailHeight={50}
        thumbnailWidth={50}
        setImageIndex={setSIndex}
        imageIndex={sIndex}
      />
    </Box>
  );
};

export default ProductView;
