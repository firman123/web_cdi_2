/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import CustomButtonV2 from "../components/CustomButtonV2";
import TopMenu from "../components/TopMenu";
import { useAuthContext } from "../context/AuthContext";
import theme from "../theme";
import Snackbar from "../components/CustomSnackbar";
import SuccessDialog from "../components/SuccessDialog";

const LocalVerifyScreen = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [nik, setNik] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { sendLocalVerify, getAuthState } = useAuthContext();
  const [snackbar, setSnackBar] = useState({ message: "", open: false });

  const handleBtnContinue = () => {
    if (imgSrc === "" || nik === "") {
      setSnackBar({ message: "Image and NIK is required", open: true });
      return;
    }
    const imageResult = imgSrc.split("base64,")[1];
    const uniqueIdTrans = (length = 10) => {
      return new Date().getTime().toString().slice(-length);
    };

    const data = {
      transactionId: uniqueIdTrans(),
      component: "MOBILE",
      customer_Id: "ekyc_customer_1",
      digital_Id: nik, //Di isi NIK saat enrol
      requestType: "verify",
      NIK: nik, // Di isi NIK saat enrol
      device_Id: "9885037442",
      app_Version: "1.0",
      sdk_Version: "1.0",
      faceThreshold: "6",
      passiveLiveness: "false",
      liveness: false,
      localVerification: true,
      isVerifyWithImage: false,
      verifyIdCardFaceImage: false,
      biometrics: [
        {
          position: "F",
          image: imageResult,
          template: null,
          type: "Face",
        },
      ],
    };

    sendLocalVerify(data);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      height: 470,
    });
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const handleClose = () => {
    setShowSuccessDialog(false);
    setImgSrc(null);
    setNik("");
  };

  useEffect(() => {
    if (
      getAuthState("result") &&
      getAuthState("result").errorMessage === "SUCCESS"
    ) {
      setShowSuccessDialog(true);
    }
  }, [getAuthState("result")]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <TopMenu showHome={true} />

      {imgSrc ? (
        <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
          <Box>
            <img
              alt="imageresult"
              src={imgSrc}
              style={{ height: 500, objectFit: "cover" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 2,
              mt: 1,
            }}
          >
            <CustomButtonV2
              type={"ok"}
              btnName={"Retake"}
              textColor={"white"}
              onClick={() => setImgSrc(null)}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography fontFamily={"Poppins"} sx={{ mb: 4 }}>
            Please take a selfie with front camera
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              height={470}
              style={{
                display: "flex",
                alignSelf: "center",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 110,
              }}
            >
              <img
                alt="selfie"
                src={require("../assets/images/img_frame_selfie.png")}
                sx={{ maxWidth: 1024 }}
              />
            </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <CustomButtonV2
              type={"ok"}
              btnName={"Capture Face"}
              textColor={"white"}
              onClick={() => capture()}
            />
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          mt: theme.spacing(5),
          mb: theme.spacing(6),
        }}
      >
        <Typography
          fontFamily={"Poppins"}
          sx={{
            color: "#4B4343",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          NIK
        </Typography>
        <Box>
          <input
            type={"text"}
            value={nik}
            pattern="\d*"
            maxLength={16}
            onChange={(value) => setNik(value.target.value)}
            style={{
              background: "#FFFFFF",
              border: "2px solid #363795",
              boxSizing: "border-box",
              borderRadius: "8px",
              fontFamily: "Poppins",
              padding: 8,
              width: 300,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 2,
        }}
      >
        <CustomButtonV2 btnName={"Reset"} onClick={() => setNik("")} />
        <CustomButtonV2
          type="ok"
          btnName={"Continue"}
          textColor={"#ffffff"}
          onClick={() => handleBtnContinue()}
        />
      </Box>
      <Snackbar
        open={snackbar.open}
        type="error"
        message={snackbar.message}
        onClose={() => setSnackBar({ message: "", open: false })}
      />
      {showSuccessDialog && <SuccessDialog handleClose={() => handleClose()} />}
    </Box>
  );
};

export default LocalVerifyScreen;
