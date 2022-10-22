import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingDialog from "../components/LoadingDialog";
import Snackbar from "../components/CustomSnackbar";
import * as localStorageNames from "../utils/LocalStorageNames";
import { API_KEY, URL_ACCESS_TOKEN } from "../utils/Constants";
import axios from "axios";

export const AuthContext = React.createContext([{}, () => {}]);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    result: null,
    snackbar: {
      message: "",
      open: false,
    },
    resultEnkripsi: null,
  });

  const getAuthState = (key) => {
    if (key) {
      return state[key];
    }

    return state;
  };

  const setAuthState = (newData) => {
    setState((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const sendOCR = (data) => {
    setAuthState({ loading: true });
    const ocrEndpointJson = JSON.parse(
      localStorage.getItem(localStorageNames.OCR_ENDPOINT)
    );
    hitAPI(ocrEndpointJson?.url, data)
      .then((response) => {
        setAuthState({ loading: false });

        if (response.errorMessage === "SUCCESS") {
          navigate("/result", {
            state: { demographics: response.demographics },
          });
        } else {
          setAuthState({
            snackbar: { message: response.errorMessage, open: true },
          });
        }
      })
      .catch((error) => {
        setAuthState({ loading: false });
      });
  };

  const sendBiometrics = (data) => {
    setAuthState({ loading: true });

    const bioEndpointJson = JSON.parse(
      localStorage.getItem(localStorageNames.BIO_ENDPOINT)
    );
    hitAPI(bioEndpointJson?.url, data)
      .then((response) => {
        setAuthState({ loading: false });

        if (response.errorMessage === "SUCCESS") {
          navigate("/resultBio", {
            state: {
              resultBio: {
                ...data,
                verificationResult: response.verificationResult,
              },
            },
          });
        } else {
          setAuthState({
            snackbar: { message: response.errorMessage, open: true },
          });
        }
      })
      .catch((error) => {
        setAuthState({ loading: false });
      });
  };

  const sendEnrollData = (data) => {
    setAuthState({ loading: true });
    const enrollEndpointJson = JSON.parse(
      localStorage.getItem(localStorageNames.ENROLL_ENDPOINT)
    );
    hitAPI(enrollEndpointJson?.url, data)
      .then((response) => {
        setAuthState({ loading: false });
        if (response.error_message === "SUCCESS") {
          navigate("/result-enroll", {
            state: {
              data: data,
            },
          });
        } else {
          setAuthState({
            snackbar: { message: response.error_message, open: true },
          });
        }
      })
      .catch((error) => {
        setAuthState({ loading: false });
      });
  };

  const sendDukcapilData = (data) => {
    setAuthState({ loading: true });
    const dukcapilEndpointJson = JSON.parse(
      localStorage.getItem(localStorageNames.DUKCAPIL_ENDPOINT)
    );

    hitAPI(dukcapilEndpointJson?.url, data)
      .then((response) => {
        setAuthState({ loading: false });
        if (response.errorMessage) {
          setAuthState({
            result: response,
            snackbar: { message: response.errorMessage, open: true },
          });
        }

        if (response.error.errorMessage === "Sukses.") {
          setAuthState({ result: response });
        } else {
          setAuthState({
            result: response,
            snackbar: { message: response.error.errorMessage, open: true },
          });
        }
      })
      .catch((error) => {
        setAuthState({ result: null, loading: false });
      });
  };

  const sendLocalVerify = (data) => {
    setAuthState({ loading: true });
    const verifyLocalJson = JSON.parse(
      localStorage.getItem(localStorageNames.LOCAL_VERIFY_ENDPOINT)
    );

    hitAPI(verifyLocalJson?.url, data)
      .then((response) => {
        setAuthState({ loading: false });

        console.log("response bos ", response);
        if (response.errorMessage === "SUCCESS") {
          setAuthState({
            result: response,
          });
        } else {
          setAuthState({
            snackbar: { message: response.error.errorMessage, open: true },
          });
        }
      })
      .catch((error) => {
        setAuthState({ result: null, loading: false });
      });
  };

  const enkripPassword = (data, filePem) => {
    setAuthState({ loading: true });
    const url = "https://api.cdi-systems.com/RSAEnc/api/2.0/encrypt";

    hitAPI_V2(url, JSON.stringify(data), filePem)
      .then((response) => {
        setAuthState({ loading: false, resultEnkripsi: response });
        if (response.status === 200) {
        }
      })
      .catch((error) => {
        setAuthState({ resultEnkripsi: null, loading: false });
      });
  };

  const generateAccessToken = async () => {
    console.log("generate access token");
    try {
      const response = await axios.post(URL_ACCESS_TOKEN, null, {
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${API_KEY}`,
        },
      });

      return response;
    } catch (error) {
      setAuthState({
        snackbar: { message: error.message, open: true },
      });
      return null;
    }
  };

  const uniqueIdTrans = (length = 10) => {
    return new Date().getTime().toString().slice(-length);
  };

  const sendDemography = async (body) => {
    try {
      setAuthState({ loading: true });

      delete body.status;

      body["transactionId"] = uniqueIdTrans();
      body["transactionSource"] = "MOBILE";
      body["customer_Id"] = "ekyc_customer";
      body["treshold"] = 90;

      const generateToken = await generateAccessToken();
      if (generateToken && generateToken.status === 200) {
        console.log("generat token ", generateToken);
        const accessToken = generateToken.data.access_token;
        const response = await axios.post(
          "https://api.withtrustlink.com/sandbox/ekyc/v1/demographics",
          body,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setAuthState({ loading: false });

        return response;
      }
      return null;
    } catch (error) {
      setAuthState({
        loading: false,
        snackbar: { message: error.message, open: true },
      });
    }

    return null;
  };

  const hitAPI = async (url, data) => {
    try {
      const feedback = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      let response = await feedback.json();

      response.status = feedback.status;
      return response;
    } catch (e) {
      console.log("ERROR ", e);
    }
  };

  const hitAPI_V2 = async (url, data, filePem) => {
    const formData = new FormData();

    formData.append("data", data);
    formData.append("filename", filePem);

    try {
      const feedback = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      let response = await feedback.json();

      response.status = feedback.status;
      return response;
    } catch (e) {
      console.log("ERROR ", e);
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem(localStorageNames.IS_LOGIN);
    if (!isLogin) {
      navigate("/", { replace: true });
    }
  });

  return (
    <AuthContext.Provider
      value={{
        sendOCR,
        sendBiometrics,
        sendEnrollData,
        sendDukcapilData,
        sendLocalVerify,
        getAuthState,
        enkripPassword,
        setAuthState,
        generateAccessToken,
        sendDemography,
      }}
    >
      {children}
      {state.loading && <LoadingDialog />}
      <Snackbar
        open={state.snackbar.open}
        type="error"
        message={state.snackbar.message}
        onClose={() => setState({ snackbar: { message: "", open: false } })}
      />
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const value = useContext(AuthContext);
  if (value == null) {
    throw new Error("useAuthContext() called outside of a Provider?");
  }
  return value;
};

export default AuthProvider;
