import { Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import CustomButtonV2 from "../components/CustomButtonV2";
import InputWithLabel from "../components/InputWithLabel";
import TopMenu from "../components/TopMenu";
import theme from "../theme";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const param = {
  User_id: "",
  Password: "",
  NIK: "",
  Nama_lengkap: "",
  Alamat: "",
  RT: "",
  RW: "",
  Kel_Desa: "",
  Kecamatan: "",
  Jenis_kelamin: "",
  Gol_Darah: "",
  Tempat_lahir: "",
  Tanggal_lahir: "",
  Agama: "",
  Status_perkawinan: "",
  Pekerjaan: "",
  Kewarganegaraan: "",
  Berlaku_hingga: "",
  Kota: "",
  Provinsi: "",
};

const DemographyScreen = () => {
  const classes = useStyles();
  const { sendDemography, getAuthState, enkripPassword } = useAuthContext();
  const [input, setInput] = useState(param);
  const [enkripsi, setEnkripsi] = useState(param);
  const [pemFile, setPemFile] = useState(null);

  const onFileChange = (event) => {
    const data = event.target.files[0];
    setPemFile(data);
  };

  const handleBtnSend = () => {
    console.log("data ", input);
    enkripPassword(input, pemFile);
  };

  const handleSendDemography = async () => {
    const result = await sendDemography(enkripsi);
    console.log("Demography result", result);
  };

  const resetBtn = () => {
    setInput({
      User_id: "poc_user",
      Password: "P@ssw0rd123",
      NIK: "1302102202980005",
      Nama_lengkap: "MUHAMMAD IKHSANUDDIN",
      Alamat: "PERUM TAMAN ASRI JORONG HALABAN",
      RT: "000",
      RW: "000",
      Kel_Desa: "Madiun",
      Kecamatan: "Madiun",
      Jenis_kelamin: "Laki Laki",
      Tempat_lahir: "SUMATRA BARAT",
      Tanggal_lahir: "22/02/1993",
      Kota: "SOLOK",
      Provinsi: "SUMATRA BARAT",
      Gol_Darah: "A",
      Agama: "Islamm",
      Status_perkawinan: "Kawin",
      Pekerjaan: "IT",
      Kewarganegaraan: "Indonnesia",
      Berlaku_hingga: "22/09/2060",
    });
  };

  useEffect(() => {
    if (
      getAuthState("resultEnkripsi") &&
      getAuthState("resultEnkripsi").status === 200
    ) {
      const result = getAuthState("resultEnkripsi");
      setEnkripsi(result);
    }
  }, [getAuthState]);
  return (
    <Box className={classes.container}>
      <TopMenu showHome={true} />
      <Container>
        <Grid
          container
          sx={{
            backgroundColor: "#F1F2F4",
            p: 5,
            mt: 5,
          }}
        >
          <Grid item xs={6}>
            <Box sx={{ pr: 10 }}>
              <Typography color={"#3E4462"} fontSize={24} fontWeight={600}>
                ENCRYPT DATA
              </Typography>
              <form>
                <Box className={classes.boxForm}>
                  <InputWithLabel
                    label={"User ID"}
                    value={input.User_id}
                    onChangeInput={(value) =>
                      setInput({ ...input, User_id: value })
                    }
                  />
                  <InputWithLabel
                    label={"Password"}
                    value={input.Password}
                    onChangeInput={(value) =>
                      setInput({ ...input, Password: value })
                    }
                  />
                  <InputWithLabel
                    label={"NIK"}
                    value={input.NIK}
                    onChangeInput={(value) =>
                      setInput({ ...input, NIK: value })
                    }
                  />
                  <InputWithLabel
                    label={"Nama Lengkap"}
                    value={input.Nama_lengkap}
                    onChangeInput={(value) =>
                      setInput({ ...input, Nama_lengkap: value })
                    }
                  />
                  <InputWithLabel
                    label={"Alamat"}
                    value={input.Alamat}
                    onChangeInput={(value) =>
                      setInput({ ...input, Alamat: value })
                    }
                  />
                  <InputWithLabel
                    label={"RT"}
                    value={input.RT}
                    onChangeInput={(value) => setInput({ ...input, RT: value })}
                  />
                  <InputWithLabel
                    label={"RW"}
                    value={input.RW}
                    onChangeInput={(value) => setInput({ ...input, RW: value })}
                  />
                  <InputWithLabel
                    label={"Kel / Desa"}
                    value={input.Kel_Desa}
                    onChangeInput={(value) =>
                      setInput({ ...input, Kel_Desa: value })
                    }
                  />
                  <InputWithLabel
                    label={"Kecamatan"}
                    value={input.Kecamatan}
                    onChangeInput={(value) =>
                      setInput({ ...input, Kecamatan: value })
                    }
                  />
                  <InputWithLabel
                    label={"Jenis Kelamin"}
                    value={input.Jenis_kelamin}
                    onChangeInput={(value) =>
                      setInput({ ...input, Jenis_kelamin: value })
                    }
                  />
                  <InputWithLabel
                    label={"Gol Darah"}
                    value={input.Gol_Darah}
                    onChangeInput={(value) =>
                      setInput({ ...input, Gol_Darah: value })
                    }
                  />

                  <InputWithLabel
                    label={"Tanggal Lahir"}
                    value={input.Tanggal_lahir}
                    onChangeInput={(value) =>
                      setInput({ ...input, Tanggal_lahir: value })
                    }
                  />

                  <InputWithLabel
                    label={"Agama"}
                    value={input.Agama}
                    onChangeInput={(value) =>
                      setInput({ ...input, Agama: value })
                    }
                  />
                  <InputWithLabel
                    label={"Status Perkawinan"}
                    value={input.Status_perkawinan}
                    onChangeInput={(value) =>
                      setInput({ ...input, Status_perkawinan: value })
                    }
                  />
                  <InputWithLabel
                    label={"Pekerjaan"}
                    value={input.Pekerjaan}
                    onChangeInput={(value) =>
                      setInput({ ...input, Pekerjaan: value })
                    }
                  />
                  <InputWithLabel
                    label={"Kewarganegaraan"}
                    value={input.Kewarganegaraan}
                    onChangeInput={(value) =>
                      setInput({ ...input, Kewarganegaraan: value })
                    }
                  />
                  <InputWithLabel
                    label={"Berlaku Hingga"}
                    value={input.Berlaku_hingga}
                    onChangeInput={(value) =>
                      setInput({ ...input, Berlaku_hingga: value })
                    }
                  />
                  <InputWithLabel
                    label={"Kota"}
                    value={input.Kota}
                    onChangeInput={(value) =>
                      setInput({ ...input, Kota: value })
                    }
                  />
                  <InputWithLabel
                    label={"Provinsi"}
                    value={input.Provinsi}
                    onChangeInput={(value) =>
                      setInput({ ...input, Provinsi: value })
                    }
                  />
                  <Box
                    display={"flex"}
                    flexDirection="row"
                    alignItems={"center"}
                  >
                    <Typography
                      color={"#3E4462"}
                      sx={{
                        textAlign: "left",
                        fontFamily: "Poppins",
                      }}
                      fontSize={12}
                    >
                      {pemFile ? pemFile.name : "Upload pem file"}
                    </Typography>

                    <input
                      id="contained-button-file"
                      type="file"
                      onChange={onFileChange}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="contained-button-file">
                      <img
                        alt="logo"
                        src={require("../assets/images/upload.png")}
                        style={{ width: 22, marginLeft: theme.spacing(3) }}
                      />
                    </label>
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
                      btnName={"Process"}
                      textColor={"#ffffff"}
                      onClick={() => handleBtnSend()}
                    />
                    <CustomButtonV2
                      type="ok"
                      btnName={"Reset"}
                      textColor={"#ffffff"}
                      onClick={() => resetBtn()}
                    />
                  </Box>
                </Box>
              </form>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography color={"#3E4462"} fontSize={24} fontWeight={600}>
                RESULT
              </Typography>

              <Box className={classes.boxForm}>
                <InputWithLabel label={"User ID"} value={enkripsi.user_id} />
                <InputWithLabel label={"Password"} value={enkripsi.password} />
                <InputWithLabel label={"NIK"} value={enkripsi.nik} />
                <InputWithLabel
                  label={"Nama Lengkap"}
                  value={enkripsi.nama_lengkap}
                />
                <InputWithLabel label={"Alamat"} value={enkripsi.alamat} />
                <InputWithLabel label={"RT"} value={enkripsi.RT} />
                <InputWithLabel label={"RW"} value={enkripsi.RW} />
                <InputWithLabel
                  label={"Kel / Desa"}
                  value={enkripsi.kel_Desa}
                />
                <InputWithLabel
                  label={"Kecamatan"}
                  value={enkripsi.kecamatan}
                />
                <InputWithLabel
                  label={"Jenis Kelamin"}
                  value={enkripsi.jenis_kelamin}
                />
                <InputWithLabel
                  label={"Gol Darah"}
                  value={enkripsi.gol_darah}
                />

                <InputWithLabel
                  label={"Tanggal Lahir"}
                  value={enkripsi.tanggal_lahir}
                />
                <InputWithLabel label={"Agama"} value={enkripsi.agama} />
                <InputWithLabel
                  label={"Status Perkawinan"}
                  value={enkripsi.status_perkawinan}
                />
                <InputWithLabel
                  label={"Pekerjaan"}
                  value={enkripsi.pekerjaan}
                />
                <InputWithLabel
                  label={"Kewarganegaraan"}
                  value={enkripsi.kewarganegaraan}
                />
                <InputWithLabel
                  label={"Berlaku Hingga"}
                  value={enkripsi.berlaku_hingga}
                />
                <InputWithLabel label={"Kota"} value={enkripsi.kota} />
                <InputWithLabel label={"Provinsi"} value={enkripsi.provinsi} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 2,
                    mt: theme.spacing(10),
                  }}
                >
                  <CustomButtonV2
                    type="ok"
                    btnName={"Process"}
                    textColor={"#ffffff"}
                    onClick={() => handleSendDemography()}
                  />
                  <CustomButtonV2
                    type="ok"
                    btnName={"Reset"}
                    textColor={"#ffffff"}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  boxForm: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    marginTop: theme.spacing(2),
  },
});

export default DemographyScreen;
