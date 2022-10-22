/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid, TextareaAutosize, Typography } from "@mui/material";
import { Box } from "@mui/system";
import InputWithLabel from "../components/InputWithLabel";
import TopMenu from "../components/TopMenu";
import CustomButton from "../components/CustomButtonV2";
import CustomButtonV2 from "../components/CustomButtonV2";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const param = {
  url: "",
  transactionId: "",
  transactionSource: "",
  customer_Id: "",
  NIK: "",
  faceThreshold: "",
  thresholdInPercentage: null,
  faceImage: "",
  user_id: "",
  password: "",
  ip: "",
};

const initialEnkripsi = {
  nik: "",
  user_id: "",
  password: "",
};

const DukcapilScreen = () => {
  const [pemFile, setPemFile] = useState(null);
  const [input, setInput] = useState(param);
  const { sendDukcapilData, setAuthState, getAuthState, enkripPassword } =
    useAuthContext();
  const [enkripsi, setEnkripsi] = useState(initialEnkripsi);
  const [resultEnkripsi, setResultEnkripsi] = useState(initialEnkripsi);
  const [resultDukcapil, setResultDukcapil] = useState(null);
  const [errorNik, setErrorNik] = useState("");

  const onFileChange = (event) => {
    const data = event.target.files[0];
    setPemFile(data);
  };

  const clearData = () => {
    setInput((prevData) => ({
      ...prevData,
      ...param,
    }));

    setAuthState({ result: null });
  };

  const handleBtnEnkripsi = () => {
    setErrorNik("");
    if (enkripsi.nik === "") {
      setErrorNik("NIK tidak boleh kosong");
      return true;
    }

    if (enkripsi.nik.length < 16) {
      setErrorNik("NIK kurang dari 16 digit");
      return true;
    }

    if (enkripsi.nik.length > 16) {
      setErrorNik("NIK lebih dari 16 digit");
      return true;
    }

    if (enkripsi.nik.length === 16) {
      if (enkripsi.nik.slice(0, 1) === "0") {
        setErrorNik("NIK salah format");
        return true;
      }

      if (
        enkripsi.nik.slice(enkripsi.nik.length - 4, enkripsi.nik.length + 1) ===
        "0000"
      ) {
        setErrorNik("4 digit terakhir tidak boleh 0");
        return true;
      }

      const numbers = /^[0-9]+$/;
      if (!enkripsi.nik.match(numbers)) {
        setErrorNik("NIK hanya boleh diisi dengan angka");
        return true;
      }
    }

    //
    enkripPassword(enkripsi, pemFile);
  };

  const clearEnkripsi = () => {
    setEnkripsi(initialEnkripsi);
    setResultEnkripsi({
      nik: "",
      user_id: "",
      password: "",
    });
  };

  const sendData = () => {
    sendDukcapilData({
      ...input,
      thresholdInPercentage:
        input.thresholdInPercentage === "false" ? false : true,
    });
  };

  useEffect(() => {
    if (getAuthState("result")) {
      setResultDukcapil(JSON.stringify(getAuthState("result"), undefined, 4));
    }
  }, [getAuthState]);

  useEffect(() => {
    if (
      getAuthState("resultEnkripsi") &&
      getAuthState("resultEnkripsi").status === 200
    ) {
      const result = getAuthState("resultEnkripsi");
      setResultEnkripsi({
        nik: result.nik,
        user_id: result.user_id,
        password: result.password,
      });
    }
  }, [getAuthState("resultEnkripsi")]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopMenu showHome={true} />
      <Container>
        <Grid container sx={{ backgroundColor: "#F1F2F4", p: 5, mt: 5 }}>
          <Grid item xs={5}>
            <Box>
              <Typography
                color={"#3E4462"}
                fontSize={24}
                sx={{ textDecoration: "underline", fontFamily: "Poppins" }}
              >
                INPUT
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <InputWithLabel
                  label="URL"
                  value={input.url}
                  onChangeInput={(value) => setInput({ ...input, url: value })}
                />
                <InputWithLabel
                  label="Transaction id"
                  value={input.transactionId}
                  onChangeInput={(value) =>
                    setInput({ ...input, transactionId: value })
                  }
                />
                <InputWithLabel
                  label="Transaction Source"
                  value={input.transactionSource}
                  onChangeInput={(value) =>
                    setInput({ ...input, transactionSource: value })
                  }
                />
                <InputWithLabel
                  label="Customer id"
                  value={input.customer_Id}
                  onChangeInput={(value) =>
                    setInput({ ...input, customer_Id: value })
                  }
                />
                <InputWithLabel
                  label="NIK"
                  value={input.NIK}
                  onChangeInput={(value) => setInput({ ...input, NIK: value })}
                />
                <InputWithLabel
                  label="Treshold in Percentage"
                  value={input.thresholdInPercentage}
                  onChangeInput={(value) =>
                    setInput({ ...input, thresholdInPercentage: value })
                  }
                />
                <InputWithLabel
                  label="FaceTreshold"
                  value={input.faceThreshold}
                  onChangeInput={(value) =>
                    setInput({ ...input, faceThreshold: value })
                  }
                />
                <InputWithLabel
                  label="Face image"
                  value={input.faceImage}
                  onChangeInput={(value) =>
                    setInput({ ...input, faceImage: value })
                  }
                />
                <InputWithLabel
                  label="User id"
                  value={input.user_id}
                  onChangeInput={(value) =>
                    setInput({ ...input, user_id: value })
                  }
                />
                <InputWithLabel
                  label="Password"
                  value={input.password}
                  onChangeInput={(value) =>
                    setInput({ ...input, password: value })
                  }
                />
                <InputWithLabel
                  label="IP"
                  value={input.ip}
                  onChangeInput={(value) => setInput({ ...input, ip: value })}
                />
                <InputWithLabel
                  label="Type"
                  value={input.type}
                  onChangeInput={(value) => setInput({ ...input, type: value })}
                />
                <InputWithLabel
                  label="Position"
                  value={input.position}
                  onChangeInput={(value) =>
                    setInput({ ...input, position: value })
                  }
                />
                <InputWithLabel
                  label="Template"
                  value={input.template}
                  onChangeInput={(value) =>
                    setInput({ ...input, template: value })
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 2,
                  mt: 2,
                }}
              >
                <CustomButtonV2
                  type="ok"
                  btnName={"Send"}
                  textColor={"#ffffff"}
                  onClick={() => sendData()}
                />
                <CustomButtonV2
                  type="ok"
                  btnName={"Reset"}
                  textColor={"#ffffff"}
                  onClick={() => clearData()}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              color={"#3E4462"}
              fontSize={24}
              sx={{ textDecoration: "underline", fontFamily: "Poppins" }}
            >
              RESULT
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 4,
                mr: 4,
              }}
            >
              <TextareaAutosize minRows={7} defaultValue={resultDukcapil} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                ml: 4,
                mt: 2,
                gap: 2,
              }}
            >
              <Typography>
                {pemFile ? pemFile.name : "Upload pem.file"}
              </Typography>

              {/* <input type="file" onChange={onFileChange} /> */}
              <input
                id="contained-button-file"
                type="file"
                onChange={onFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="contained-button-file">
                <CustomButton btnName="Browse" width={150} padding={4} />
              </label>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                ml: 4,
                mr: 4,
                mt: 4,
              }}
            >
              <Typography sx={{ textAlign: "center" }}>
                ENCRYPTED DATA
              </Typography>
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
                  fontFamily: "Poppins",
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  fontSize: 12,
                  color: "#3E4462",
                  alignItems: "center",
                }}
              >
                <div style={{ width: 100, textAlign: "left", color: "red" }}>
                  Result
                </div>
                <input
                  value={errorNik}
                  style={{
                    background: "#F1F2F4",
                    border: "1px solid red",
                    boxSizing: "border-box",
                    padding: 4,
                    width: "322px",
                  }}
                />
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DukcapilScreen;
