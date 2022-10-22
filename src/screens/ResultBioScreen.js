/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButtonV2 from "../components/CustomButtonV2";
import TopMenu from "../components/TopMenu";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const ResultBioScreen = () => {
  const navigate = useNavigate();
  const params = useLocation();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (params.state.resultBio) {
      setResult(params.state.resultBio);
    }
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopMenu showHome={true} />
      <Typography
        fontFamily={"Poppins"}
        color={"rgba(62, 68, 98, 1)"}
        fontSize={24}
        sx={{ fontWeight: 500, mt: 6 }}
      >
        Result
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#E9E9E9",
          borderRadius: "11px",
          alignSelf: "center",
          mt: 2,
          pb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            pt: 3,
            pl: 7,
            pr: 7,
            pb: 4,
          }}
        >
          <Box>
            <Typography fontFamily={"Poppins"} sx={{ pt: 7, pb: 5 }}>
              ID
            </Typography>
            <img
              alt="ktp"
              src={`data:image/png;base64, ${result?.probeFace}`}
              style={{ width: 390, height: 240, objectFit: "cover" }}
            />
          </Box>
          <Box>
            <Typography fontFamily={"Poppins"} sx={{ pt: 7, pb: 5 }}>
              Photo Selfie
            </Typography>
            <img
              alt="ktp"
              src={`data:image/png;base64, ${result?.galleryFace}`}
              style={{ width: 390, height: 240, objectFit: "cover" }}
            />
          </Box>
        </Box>
        {/* <Typography fontFamily={"Poppins"} textAlign={"center"}>
          98.55
        </Typography> */}
        <Box
          display={"flex"}
          flexDirection={"row"}
          sx={{ justifyContent: "center" }}
        >
          <Typography
            fontFamily={"Poppins"}
            textAlign={"center"}
            color={result?.verificationResult ? "#1BCE05" : "red"}
          >
            {result?.verificationResult ? "MATCH" : "UNMATCH"}
          </Typography>
          {result?.verificationResult ? (
            <CheckIcon sx={{ color: "#1BCE05" }} />
          ) : (
            <ClearIcon sx={{ color: "red" }} />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 2,
          mt: 8,
        }}
      >
        <CustomButtonV2
          btnName={"Reset"}
          onClick={() =>
            navigate("/service-bio", { replace: true, state: "bio" })
          }
        />
        <CustomButtonV2
          type="ok"
          btnName={"Continue"}
          textColor={"#ffffff"}
          onClick={() => navigate("/home", { replace: true })}
        />
      </Box>
    </Box>
  );
};

export default ResultBioScreen;
