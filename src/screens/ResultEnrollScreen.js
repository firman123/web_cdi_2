/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButtonV2 from "../components/CustomButtonV2";
import ImageRounded from "../components/ImageRounded";
import TopMenu from "../components/TopMenu";
import CheckIcon from "@mui/icons-material/Check";

const ResultEnrollScreen = () => {
  const navigate = useNavigate();
  const params = useLocation();
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(params.state.data);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopMenu showHome={true} />
      <Typography
        fontFamily={"Poppins"}
        color={"#3E4462"}
        sx={{ mt: 5 }}
        fontSize={30}
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
          mt: 3,
          pb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minWidth: 600,
            pt: 3,
            pl: 7,
            pr: 7,
            pb: 4,
          }}
        >
          <Typography
            color={"#21213B"}
            fontFamily={"Poppins"}
            fontWeight={"light"}
          >
            Data Match
          </Typography>
          <Typography
            sx={{
              color: "#4B4343",
              textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              mt: 6,
            }}
            fontSize={20}
          >
            NIK
          </Typography>
          <input
            type={"text"}
            value={result?.NIK}
            style={{
              background: "#FFFFFF",
              border: "2px solid #363795",
              boxSizing: "border-box",
              borderRadius: "8px",
              fontFamily: "Poppins",
              padding: 8,
              width: 300,
              marginTop: 20,
              textAlign: "center",
            }}
          />
          <ImageRounded
            imageSrc={`data:image/png;base64,${result?.face_image}`}
            style={{
              width: 150,
              height: 150,
              objectFit: "cover",
              marginTop: 10,
            }}
          />
        </Box>

        <Box
          display={"flex"}
          flexDirection={"row"}
          sx={{ justifyContent: "center" }}
        >
          <Typography
            fontFamily={"Poppins"}
            textAlign={"center"}
            color={"#1BCE05"}
          >
            Enrolled Success
          </Typography>
          <CheckIcon sx={{ color: "#1BCE05" }} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 2,
          mt: 5,
        }}
      >
        <CustomButtonV2 btnName={"Reset"} onClick={() => navigate(-1)} />
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

export default ResultEnrollScreen;
