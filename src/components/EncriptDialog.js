import { Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useState } from "react";
import CustomButton from "./CustomButton";
import CustomButtonV2 from "./CustomButtonV2";
import InputWithLabel from "./InputWithLabel";

const initialEnkripsi = {
  nik: "",
  user_id: "",
  password: "",
};

const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 500,
  },
});

const EncriptDialog = ({ open, handleClose }) => {
  const [enkripsi, setEnkripsi] = useState(initialEnkripsi);
  const [resultEnkripsi, setResultEnkripsi] = useState(initialEnkripsi);
  const [pemFile, setPemFile] = useState(null);

  const classes = useStyles();

  const handleBtnEnkripsi = () => {};

  const clearEnkripsi = () => {};

  const onFileChange = (event) => {
    const data = event.target.files[0];
    setPemFile(data);
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          display={"flex"}
          flexDirection="column"
          className={classes.container}
        >
          <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent="center"
            style={{ marginBottom: 20 }}
          >
            <h2 id="parent-modal-title">ENCRYPTED DATA</h2>

            <Box
              sx={{
                fontFamily: "Poppins",
                display: "flex",
                flexDirection: "row",
                gap: 1,
                fontSize: 12,
                color: "#3E4462",
                alignItems: "center",
                mb: 1,
              }}
            >
              <div style={{ width: 100, textAlign: "left" }}>NIK</div>
              <InputWithLabel
                showLabel={false}
                value={enkripsi.nik}
                onChangeInput={(value) =>
                  setEnkripsi({ ...enkripsi, nik: value })
                }
              />
              =
              <InputWithLabel showLabel={false} value={resultEnkripsi.nik} />
            </Box>
            <Box
              sx={{
                fontFamily: "Poppins",
                display: "flex",
                flexDirection: "row",
                gap: 1,
                fontSize: 12,
                color: "#3E4462",
                alignItems: "center",
                mb: 1,
              }}
            >
              <div style={{ width: 100, textAlign: "left" }}>User Id</div>
              <InputWithLabel
                showLabel={false}
                value={enkripsi.user_id}
                onChangeInput={(value) =>
                  setEnkripsi({ ...enkripsi, user_id: value })
                }
              />
              =
              <InputWithLabel
                showLabel={false}
                value={resultEnkripsi.user_id}
              />
            </Box>
            <Box
              sx={{
                fontFamily: "Poppins",
                display: "flex",
                flexDirection: "row",
                gap: 1,
                fontSize: 12,
                color: "#3E4462",
                alignItems: "center",
              }}
            >
              <div style={{ width: 100, textAlign: "left" }}>Password</div>
              <InputWithLabel
                showLabel={false}
                type={"password"}
                value={enkripsi.password}
                onChangeInput={(value) =>
                  setEnkripsi({ ...enkripsi, password: value })
                }
              />
              =
              <InputWithLabel
                showLabel={false}
                value={resultEnkripsi.password}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                width: 430,
                flexDirection: "row",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Box style={{ display: "flex", flexGrow: 1 }}>
                <Typography color={"#3E4462"} fontSize={12}>
                  {pemFile ? pemFile.name : "Upload pem.file"}
                </Typography>
              </Box>

              {/* <input type="file" onChange={onFileChange} /> */}
              <input
                id="contained-button-file"
                type="file"
                onChange={onFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="contained-button-file">
                <CustomButtonV2 btnName="Browse" width={150} padding={4} />
              </label>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                fontSize: 12,
                color: "#3E4462",
                alignItems: "center",
                mt: 4,
              }}
            >
              <div style={{ width: 100 }} />
              <CustomButtonV2
                type="ok"
                btnName={"Send"}
                textColor={"#ffffff"}
                width={150}
                onClick={() => handleBtnEnkripsi()}
              />
              <CustomButtonV2
                type="ok"
                btnName={"Reset"}
                textColor={"#ffffff"}
                width={150}
                onClick={() => clearEnkripsi()}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EncriptDialog;
