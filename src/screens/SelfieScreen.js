/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import CustomButtonV2 from "../components/CustomButtonV2";
import TopMenu from "../components/TopMenu";
import { useAuthContext } from "../context/AuthContext";

const SelfieScreen = () => {
  const webcamRef = useRef(null);
  const params = useLocation();
  const [imgSrc, setImgSrc] = useState(null);
  const [imgKtp, setImgKtp] = useState(null);
  const { sendEnrollData, sendBiometrics } = useAuthContext();

  const handleBtnContinue = () => {
    const imageResult = imgSrc.split("base64,")[1];

    if (params && params.state.type === "enroll") {
      const data = {
        NIK: params.state.nik,
        face_image: imageResult,
      };
      sendEnrollData(data);
    } else {
      const ktpImage = imgKtp.split("base64,")[1];
      const uniqueIdTrans = (length = 10) => {
        return new Date().getTime().toString().slice(-length);
      };
      const data = {
        transactionId: uniqueIdTrans(),
        transactionSource: "WEB",
        customer_Id: "Test_customer",
        thresholdInPercentage: false,
        faceThreshold: "6.0",
        probeFace: ktpImage,
        galleryFace: imageResult,
      };

      sendBiometrics(data);
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      height: 470,
    });
    setImgSrc(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    if (params.state.type === "bio" && params.state.imageResult) {
      setImgKtp(params.state.imageResult);
    }
  }, []);

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
              btnName={"Retake"}
              onClick={() => setImgSrc(null)}
            />
            <CustomButtonV2
              type={"ok"}
              btnName={"Continue"}
              textColor={"white"}
              onClick={() => handleBtnContinue()}
              style={{ ml: 5 }}
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
              btnName={"SEND"}
              textColor={"white"}
              onClick={() => capture()}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SelfieScreen;
