import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TopMenu from "../components/TopMenu";
import { IS_LOGIN } from "../utils/LocalStorageNames";

const ContactScreen = () => {
  const isLogin = localStorage.getItem(IS_LOGIN);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        flex: 1,
      }}
    >
      <TopMenu
        showHome={isLogin ? true : false}
        hideLogout={isLogin ? false : true}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          alt="logo"
          src={require("../assets/images/ic_logo.png")}
          style={{ width: "280px" }}
        />

        <Box sx={{ display: "flex", flexDirection: "row", mt: 10 }}>
          <img
            alt="logo"
            src={require("../assets/images/ic_email.png")}
            style={{ width: 60, marginRight: 10 }}
          />

          <Typography fontFamily={"Poppins"} color="#4B4343" fontSize={"28px"}>
            <a
              href="mailto:info@cdi-systems.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              info@cdi-systems.com
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactScreen;
