import { ButtonBase, Typography } from "@mui/material";
import theme from "../theme";

const CustomButton = (props) => {
  return (
    <div>
      <ButtonBase
        style={{
          height: 40,
          background: theme.button.login,
          borderRadius: 70,
          paddingLeft: 100,
          paddingRight: 100,
          color: "white",
        }}
        onClick={() => props.onClick()}
      >
        <Typography fontFamily="Poppins" fontSize={16}>
          Continue
        </Typography>
      </ButtonBase>
    </div>
  );
};

export default CustomButton;
