import { Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { Box } from "@mui/system";
import ServicesScreen from "./screens/ServicesScreen";
import CameraScreen from "./screens/CameraScreen";
import ResultScreen from "./screens/ResultScreen";
import SelfieScreen from "./screens/SelfieScreen";
import ResultBioScreen from "./screens/ResultBioScreen";
import EnrollScreen from "./screens/EnrollSreen";
import ResultEnrollScreen from "./screens/ResultEnrollScreen";
import DukcapilScreen from "./screens/DukcapilScreen";
import AuthProvider from "./context/AuthContext";
import ContactScreen from "./screens/ContactScreen";
import LocalVerifyScreen from "./screens/LocalVerifyScreen";
import DemographyScreen from "./screens/DemographyScreen";

const AppRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="/home"
          element={
            <AuthProvider>
              <HomeScreen />
            </AuthProvider>
          }
        />
        <Route
          path="/service-ocr"
          element={
            <AuthProvider>
              <ServicesScreen />
            </AuthProvider>
          }
        />
        <Route
          path="/service-bio"
          element={
            <AuthProvider>
              <ServicesScreen />
            </AuthProvider>
          }
        />
        <Route
          path="/camera"
          element={
            <AuthProvider>
              <CameraScreen />
            </AuthProvider>
          }
        />
        <Route
          path="/result"
          element={
            <AuthProvider>
              <ResultScreen />
            </AuthProvider>
          }
        />
        <Route
          path="/selfie"
          element={
            <AuthProvider>
              <SelfieScreen />
            </AuthProvider>
          }
        />
        <Route
          path="/resultBio"
          element={
            <AuthProvider>
              <ResultBioScreen />
            </AuthProvider>
          }
        />
        <Route
          path="/enroll"
          element={
            <AuthProvider>
              <EnrollScreen />
            </AuthProvider>
          }
        />
        <Route
          path="/result-enroll"
          element={
            <AuthProvider>
              <ResultEnrollScreen />
            </AuthProvider>
          }
        />
        <Route
          path="/dukcapil"
          element={
            <AuthProvider>
              <DukcapilScreen />
            </AuthProvider>
          }
        />
        <Route
          path="/local-verify"
          element={
            <AuthProvider>
              <LocalVerifyScreen />
            </AuthProvider>
          }
        />
        <Route
          path="/demography"
          element={
            <AuthProvider>
              <DemographyScreen />
            </AuthProvider>
          }
        />

        <Route path="/contactus" element={<ContactScreen />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
