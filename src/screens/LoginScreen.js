/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import TextInputCorner from "../components/TextInputCorner";
import TopMenu from "../components/TopMenu";
import theme from "../theme";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import LoadingDialog from "../components/LoadingDialog";
import Snackbar from "../components/CustomSnackbar";
import {
  OCR_ENDPOINT,
  BIO_ENDPOINT,
  ENROLL_ENDPOINT,
  DUKCAPIL_ENDPOINT,
  IS_LOGIN,
  LOCAL_VERIFY_ENDPOINT,
} from "../utils/LocalStorageNames";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackBar] = useState({ message: "", open: false });
  const emails = [
    "gmail",
    "yahoo",
    "soho",
    "outlook",
    "rocketmail",
    "yandex",
    "ymail",
  ];

  let error = false;
  const handleBtnLogin = () => {
    error = false;
    if (user) {
      const mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
      if (user.match(mailformat)) {
        setSnackBar({ message: "Invalid email address", open: true });
        error = true;
        return;
      }

      emails.forEach((bannedEmail) => {
        if (user.includes(bannedEmail)) {
          setSnackBar({
            message: `${bannedEmail} not allowed, please enter corporate email!`,
            open: true,
          });

          error = true;
          return;
        }
      });

      if (!error) {
        attempLogin();
      }
    } else {
      setSnackBar({ message: "Email is required", open: true });
      return;
    }
  };

  const attempLogin = async () => {
    try {
      setLoading(true);
      await addDoc(collection(db, "login"), {
        email: user,
        date: Timestamp.now(),
      });

      // await addDoc(collection(db, "endpoint"), {
      //   showMenu: false,
      //   title: "dukcapil",
      //   url: "https://google.com",
      // });

      const querySnapshot = await getDocs(collection(db, "endpoint"));
      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        switch (docData.title) {
          case "bio2bio":
            localStorage.setItem(BIO_ENDPOINT, JSON.stringify(docData));
            break;
          case "ocr":
            localStorage.setItem(OCR_ENDPOINT, JSON.stringify(docData));
            break;
          case "enroll":
            localStorage.setItem(ENROLL_ENDPOINT, JSON.stringify(docData));
            break;
          case "mohaverify":
            localStorage.setItem(DUKCAPIL_ENDPOINT, JSON.stringify(docData));
            break;
          case "localverify":
            localStorage.setItem(
              LOCAL_VERIFY_ENDPOINT,
              JSON.stringify(docData)
            );
            break;
          default:
            break;
        }
      });

      localStorage.setItem(IS_LOGIN, true);
      navigate("/home");
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem(IS_LOGIN);
    if (isLogin) {
      navigate("/home", { replace: true });
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100vh",
      }}
    >
      <TopMenu hideLogout={true} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <img
          alt="logo"
          src={require("../assets/images/ic_logo.png")}
          sx={{ width: "350px" }}
        />
        <Box
          sx={{
            width: 350,
            mt: theme.spacing(10),
            flexGrow: 1,
            marginBottom: "auto",
          }}
        >
          <TextInputCorner
            value={user}
            onChange={(value) => setUser(value)}
            placeholder="enter corporate email"
          />
        </Box>

        <Box
          sx={{
            marginBottom: theme.spacing(10),
          }}
        >
          <CustomButton title="Continue" onClick={() => handleBtnLogin()} />
        </Box>
      </Box>
      {loading && <LoadingDialog />}
      <Snackbar
        open={snackbar.open}
        type="error"
        message={snackbar.message}
        onClose={() => setSnackBar({ message: "", open: false })}
      />
    </Box>
  );
};

export default LoginScreen;
