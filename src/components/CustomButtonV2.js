import { ButtonBase, Typography } from "@mui/material";
import theme from "../theme";

const CustomButtonV2 = ({
  type,
  btnName,
  textColor,
  onClick,
  width,
  padding = 8,
}) => {
  const customStyle = (type) => {
    switch (type) {
      case "ok":
        return { background: theme.button.photo };
      default:
        return {
          background: theme.palette.primary,
          border: "1px solid #363795",
        };
    }
  };
  return (
    <ButtonBase
      component="span"
      style={{
        background: theme.button.photo,
        borderRadius: 70,
        paddingTop: padding,
        paddingBottom: padding,
        width: width || 200,
        ...customStyle(type),
      }}
      onClick={() => onClick()}
    >
      <Typography sx={{ color: textColor || "black", fontFamily: "Poppins" }}>
        {btnName}
      </Typography>
    </ButtonBase>
  );
};

export default CustomButtonV2;
