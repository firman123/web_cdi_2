import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const ImageRounded = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        fontFamily={"Poppins"}
        sx={{
          color: "#4B4343",
          textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          mb: 2,
        }}
      >
        {props.title}
      </Typography>
      <img
        alt="imagebio"
        src={props.imageSrc}
        style={{ borderRadius: "50%", ...props.style }}
      />
    </Box>
  );
};

export default ImageRounded;
