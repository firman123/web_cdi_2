import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
  button: {
    login: "#6A4272",
    photo: "#363795",
  },
  spacing: 4,
  textColor: "#3E4462",
  siteBackgroundColor: "#FFFFFF",
  green: "#64dd17",
  grey: "#b4b4b4",
});

theme = responsiveFontSizes(theme);
export default theme;
