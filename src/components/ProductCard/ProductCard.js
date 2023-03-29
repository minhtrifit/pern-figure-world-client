import { Box, Stack, Typography } from "@mui/material";
import Button from "react-bootstrap/Button";
import "./ProductCard.scss";

const ProductCard = (props) => {
  const { product, handleViewProductDetail, setLoading } = props;
  // console.log(product);

  return (
    <Box
      sx={{
        // background: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="card">
        <img src={product.photo_url[0]} alt={product.name} />
        <div className="info">
          {setLoading ? (
            <Button
              variant="primary"
              onClick={(e) => {
                handleViewProductDetail(product.id);
                setLoading(true);
              }}
            >
              Xem chi tiết
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={(e) => {
                handleViewProductDetail(product.id);
              }}
            >
              Xem chi tiết
            </Button>
          )}
        </div>
      </div>
      <Stack>
        <Typography variant="p" fontSize={14} textAlign="center" mt={1}>
          {product.name}
        </Typography>
        <Typography
          variant="p"
          fontSize={14}
          fontWeight={300}
          mt={1}
          sx={{
            color: "red",
          }}
        >
          Giá: {product.price}đ
        </Typography>
      </Stack>
    </Box>
  );
};

export default ProductCard;
