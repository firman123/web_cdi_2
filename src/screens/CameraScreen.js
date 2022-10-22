/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import CustomButtonV2 from "../components/CustomButtonV2";
import TopMenu from "../components/TopMenu";
import { useAuthContext } from "../context/AuthContext";

const CameraScreen = () => {
  const webcamRef = useRef(null);
  const params = useLocation();
  const [imgSrc, setImgSrc] = useState(null);
  const { sendOCR } = useAuthContext();
  const navigate = useNavigate();

  const handleBtnContinue = () => {
    const imageResult = imgSrc.split("base64,")[1];

    if (params.state.type === "ocr") {
      const uniqueIdTrans = (length = 10) => {
        return new Date().getTime().toString().slice(-length);
      };

      const data = {
        transactionId: uniqueIdTrans(),
        transactionSource: "WEB",
        customer_Id: "Test_customer",
        idCardImage: imageResult,
      };
      sendOCR(data);
    } else {
      navigate("/selfie", {
        state: { type: params.state.type, imageResult: imgSrc },
      });
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      height: 500,
    });
    setImgSrc(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    if (params.state.type === "ocr" && params.state.imageResult) {
      setImgSrc(params.state.imageResult);
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
              style={{
                height: 500,
                objectFit: "cover",
              }}
            />
          </Box>

          <Box sx={{ mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <CustomButtonV2 btnName={"Retake"} onClick={() => navigate(-1)} />
              <div style={{ marginLeft: 20 }}>
                <CustomButtonV2
                  type={"ok"}
                  btnName={"Continue"}
                  textColor={"white"}
                  onClick={() => handleBtnContinue()}
                  style={{ ml: 5 }}
                />
              </div>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            height={500}
            style={{
              display: "flex",
              alignSelf: "center",
            }}
          />
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
      {/* {imgSrc ? (
        <Box sx={{ position: "absolute", bottom: 40, right: 0, left: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <CustomButtonV2 btnName={"Retake"} onClick={() => navigate(-1)} />
            <div style={{ marginLeft: 20 }}>
              <CustomButtonV2
                type={"ok"}
                btnName={"Continue"}
                textColor={"white"}
                onClick={() => handleBtnContinue()}
                style={{ ml: 5 }}
              />
            </div>
          </Box>
        </Box>
      ) : (
        <Box sx={{ position: "absolute", bottom: 30, right: 0, left: 0 }}>
          <CustomButtonV2
            type={"ok"}
            btnName={"SEND"}
            textColor={"white"}
            onClick={() => capture()}
          />
        </Box>
      )} */}
    </Box>
  );
};

export default CameraScreen;
