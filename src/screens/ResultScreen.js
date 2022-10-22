/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButtonV2 from "../components/CustomButtonV2";
import EncriptDialog from "../components/EncriptDialog";
import InputResult from "../components/InputResult";
import TopMenu from "../components/TopMenu";

const ResultScreen = (props) => {
  const navigate = useNavigate();
  const params = useLocation();
  const [demographics, setDemographics] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleProcessDemography = () => {
    setShowDialog(true);
    // navigate("/home", { replace: true });
  };

  useEffect(() => {
    if (params.state && params.state.demographics) {
      setDemographics({
        ...params.state.demographics,
        ttl:
          params.state.demographics?.tempatLahir +
          "/" +
          params.state.demographics?.tanggalLahir,
      });
    }
  }, []);
  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <TopMenu showHome={true} />
      <Typography
        fontFamily={"Poppins"}
        color={"#4B4343"}
        fontSize={28}
        sx={{ mt: 5, textShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)" }}
      >
        Review Your Data
      </Typography>
      <Container sx={{ mt: 5 }}>
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              pl: 8,
              pr: 8,
            }}
          >
            <InputResult
              label="NIK"
              value={demographics?.nik}
              onChange={(value) =>
                setDemographics({ ...demographics, nik: value })
              }
            />
            <InputResult
              label="Nama"
              value={demographics?.nama}
              onChange={(value) =>
                setDemographics({ ...demographics, nama: value })
              }
            />
            <InputResult
              label="Tempat/Tanggal Lahir"
              value={demographics?.ttl}
              onChange={(value) =>
                setDemographics({ ...demographics, ttl: value })
              }
            />
            <InputResult
              label="Jenis Kelamin"
              value={demographics?.jenisKelamin}
              onChange={(value) =>
                setDemographics({ ...demographics, jenisKelamin: value })
              }
            />
            <InputResult
              label="Alamat"
              value={demographics?.alamat}
              onChange={(value) =>
                setDemographics({ ...demographics, alamat: value })
              }
            />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              pl: 8,
              pr: 8,
              mb: 2,
            }}
          >
            <InputResult
              label="RT/RW"
              value={demographics?.rtRw}
              onChange={(value) =>
                setDemographics({ ...demographics, rtRw: value })
              }
            />
            <InputResult
              label="Kelurahan/Desa"
              value={demographics?.kelurahanDesa}
              onChange={(value) =>
                setDemographics({ ...demographics, kelurahanDesa: value })
              }
            />
            <InputResult
              label="Kecamatan"
              value={demographics?.kecamatan}
              onChange={(value) =>
                setDemographics({ ...demographics, kecamatan: value })
              }
            />
            <InputResult
              label="Provinsi"
              value={demographics?.provinsi}
              onChange={(value) =>
                setDemographics({ ...demographics, provinsi: value })
              }
            />
            <InputResult
              label="Kota"
              value={demographics?.kotaKabupaten}
              onChange={(value) =>
                setDemographics({ ...demographics, kotaKabupaten: value })
              }
            />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              pl: 8,
              pr: 8,
            }}
          >
            <InputResult
              label="Agama"
              value={demographics?.agama}
              onChange={(value) =>
                setDemographics({ ...demographics, agama: value })
              }
            />
            <InputResult
              label="Status Perkawinan"
              value={demographics?.statusPerkawinan}
              onChange={(value) =>
                setDemographics({ ...demographics, statusPerkawinan: value })
              }
            />
            <InputResult
              label="Pekerjaan"
              value={demographics?.pekerjaan}
              onChange={(value) =>
                setDemographics({ ...demographics, pekerjaan: value })
              }
            />
            <InputResult
              label="Kewarganegraan"
              value={demographics?.kewarganegaraan}
              onChange={(value) =>
                setDemographics({ ...demographics, kewarganegaraan: value })
              }
            />
            <InputResult
              label="Berlaku Hingga"
              value={demographics?.berlakuHingga}
              onChange={(value) =>
                setDemographics({ ...demographics, berlakuHingga: value })
              }
            />
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 2,
          mt: 8,
        }}
      >
        <CustomButtonV2 btnName={"Retake"} onClick={() => navigate(-1)} />
        <CustomButtonV2
          type="ok"
          btnName={"Process Demography"}
          textColor={"#ffffff"}
          onClick={() => handleProcessDemography()}
        />
      </Box>
      <EncriptDialog
        open={showDialog}
        handleClose={() => setShowDialog(false)}
      />
    </Box>
  );
};

export default ResultScreen;
