import React from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import TopMenu from "../components/TopMenu";
import ImageHome from "../assets/images/img_home.png";
import theme from "../theme";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
});
const HomeScreen = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <TopMenu showHome={true} />
      <Box sx={{ mt: theme.spacing(8) }}>
        <img alt="home" src={ImageHome} style={{ width: "75%" }} />
      </Box>
    </Box>
  );
};

export default HomeScreen;
