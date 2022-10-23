import { ButtonBase, Fade, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../assets/images/ic_logo_lite.png";
import theme from "../theme";
import {
  BIO_ENDPOINT,
  DUKCAPIL_ENDPOINT,
  ENROLL_ENDPOINT,
  IS_LOGIN,
  OCR_ENDPOINT,
} from "../utils/LocalStorageNames";
import LogoutIcon from "@mui/icons-material/Logout";

const TopMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [urlEndpoint, setUrlEndpoint] = useState({
    biometric: null,
    enroll: null,
    ocr: null,
    dukcapil: null,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type) => {
    setAnchorEl(null);

    switch (type) {
      case "ocr":
        navigate("/service-ocr", { state: "ocr" });
        break;
      case "bio":
        navigate("/service-bio", { state: "bio" });
        break;
      case "enroll":
        navigate("/enroll");
        break;
      case "dukcapil":
        navigate("/dukcapil");
        break;
      case "local-verify":
        navigate("/local-verify");
        break;
      case "demography":
        navigate("/demography");
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(IS_LOGIN);

    navigate("/", { replace: true });
  };

  useEffect(() => {
    const bioEndpoint = JSON.parse(localStorage.getItem(BIO_ENDPOINT));
    const enrollEndpoint = JSON.parse(localStorage.getItem(ENROLL_ENDPOINT));
    const ocrEndpoint = JSON.parse(localStorage.getItem(OCR_ENDPOINT));
    const dukcapilEndpoint = JSON.parse(
      localStorage.getItem(DUKCAPIL_ENDPOINT)
    );

    setUrlEndpoint({
      biometric: bioEndpoint?.showMenu,
      enroll: enrollEndpoint?.showMenu,
      ocr: ocrEndpoint?.showMenu,
      dukcapil: dukcapilEndpoint?.showMenu,
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        position: "static",
        pt: "25px",
        pl: theme.spacing(10),
        pr: theme.spacing(10),
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          alignContent: "space-between",
        }}
      >
        <ButtonBase onClick={() => navigate("/")}>
          <Box display="flex" flexDirection={"row"} alignItems="center">
            <Box>
              <img alt="icon" src={Icon} style={{ height: 40 }} />
            </Box>
          </Box>
        </ButtonBase>

        {props.showHome && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              ml: theme.spacing(20),
            }}
          >
            <ButtonBase onClick={() => navigate("/home", { replace: true })}>
              <Typography
                sx={{ fontFamily: "Poppins", color: theme.textColor }}
              >
                Home
              </Typography>
            </ButtonBase>

            <ButtonBase sx={{ ml: theme.spacing(10) }} onClick={handleClick}>
              <Typography sx={{ fontFamily: "Poppins" }}>Services</Typography>
            </ButtonBase>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              {console.log("url endpoint ", urlEndpoint)}
              {/* {urlEndpoint.ocr && (
                <MenuItem onClick={() => handleClose("ocr")}>OCR</MenuItem>
              )}
              {urlEndpoint.biometric && (
                <MenuItem onClick={() => handleClose("bio")}>Bio2Bio</MenuItem>
              )}
              {urlEndpoint.enroll && (
                <MenuItem onClick={() => handleClose("enroll")}>
                  Enroll Data
                </MenuItem>
              )}

              {urlEndpoint.dukcapil && (
                <MenuItem onClick={() => handleClose("dukcapil")}>
                  Poc Dukcapil
                </MenuItem>
              )}

              <MenuItem onClick={() => handleClose("local-verify")}>
                Local Verify
              </MenuItem> */}

              <MenuItem onClick={() => handleClose("demography")}>
                POC Demography
              </MenuItem>
            </Menu>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flex: 1,
          }}
        ></Box>
        <ButtonBase onClick={() => navigate("/contactus")}>
          <Typography fontFamily={"Poppins"} fontSize={16}>
            CONTACT US
          </Typography>
        </ButtonBase>

        {!props.hideLogout && (
          <LogoutIcon sx={{ ml: 4 }} onClick={() => handleLogout()} />
        )}
      </Box>
    </Box>
  );
};

export default TopMenu;
