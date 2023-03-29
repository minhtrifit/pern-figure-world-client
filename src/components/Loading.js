import React from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

const Loading = (props) => {
  const { title } = props;
  return (
    <Box mt={15} sx={{ display: "flex", justifyContent: "center" }}>
      <Stack direction="column" spacing={1}>
        <Box margin="0 auto">
          <CircularProgress />
        </Box>
        <Typography color="primary" fontSize={20} fontWeight={700}>
          {title}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Loading;
