import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButtonV2 from "../components/CustomButtonV2";
import TopMenu from "../components/TopMenu";

const ServicesScreen = (props) => {
  const navigate = useNavigate();
  const params = useLocation();
  const [imgKtp, setImgKtp] = useState(null);

  const handleBtnTakePhoto = () => {
    navigate("/camera", { state: { type: params.state } });
  };

  const handleBtnContinue = () => {
    navigate("/selfie", {
      state: { type: params.state, imageResult: imgKtp },
    });
  };

  const changeHandler = (event) => {
    const file = event.target.files[0];

    getBase64(file)
      .then((result) => {
        if (params.state === "bio") {
          setImgKtp(result);
        } else {
          navigate("/camera", {
            state: { type: params.state, imageResult: result },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <TopMenu showHome={true} />
      {imgKtp ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: 1,
          }}
        >
          <Box>
            <img
              alt="imageresult"
              src={imgKtp}
              style={{
                height: 500,
                objectFit: "cover",
              }}
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
              onClick={() => setImgKtp(null)}
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
            height: "50vh",
          }}
        >
          <Typography
            fontSize={30}
            sx={{
              mt: 10,
              fontWeight: 500,
              color: "#3E4462",
              backdropFilter: "blur(4px)",
              fontFamily: "poppins",
            }}
          >
            ID CARD PHOTO
          </Typography>
          <Typography
            fontFamily={"Poppins"}
            fontSize={18}
            sx={{ fontFamily: "poppins", color: "#3E4462" }}
          >
            (Take ID Card picture vertically with your front camera){" "}
          </Typography>
          <Box sx={{ mt: 5 }}>
            <img
              alt="ktp"
              src={require("../assets/images/img_ktp.png")}
              style={{ width: 170 }}
            />
          </Box>
          <Box m={2}>
            <CustomButtonV2
              type="ok"
              textColor={"#ffffff"}
              btnName="Take a photo"
              onClick={() => handleBtnTakePhoto()}
            />

            <Typography
              fontFamily={"Poppins"}
              color="#3E4462"
              m={2}
              fontSize={20}
            >
              or
            </Typography>

            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={changeHandler}
              style={{ display: "none" }}
            />

            <label htmlFor="contained-button-file">
              <CustomButtonV2
                type="ok"
                textColor={"#ffffff"}
                btnName="Browse photo"
              />
            </label>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ServicesScreen;
