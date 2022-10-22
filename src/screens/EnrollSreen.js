import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButtonV2 from "../components/CustomButtonV2";
import TopMenu from "../components/TopMenu";
import Snackbar from "../components/CustomSnackbar";

const EnrollScreen = () => {
  const navigate = useNavigate();
  const [nik, setNik] = useState("");
  const [snackbar, setSnackBar] = useState({ message: "", open: false });

  const handleBtnContinue = () => {
    if (!nik) {
      setSnackBar({ message: "NIK is required", open: true });
      return;
    }

    if (nik.length < 16) {
      setSnackBar({ message: "NIK must be 16 digit number", open: true });
      return;
    }

    navigate("/selfie", { state: { type: "enroll", nik: nik } });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopMenu showHome={true} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          mb: 20,
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
              marginTop: 20,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: 2,
            mt: 15,
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
      </Box>
      <Snackbar
        open={snackbar.open}
        type="error"
        message={snackbar.message}
        onClose={() => setSnackBar({ message: "", open: false })}
      />
    </Box>
  );
};

export default EnrollScreen;
