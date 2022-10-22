import { Box } from "@mui/system";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, Dialog, Typography } from "@mui/material";
import theme from "../theme";

const SuccessDialog = ({ handleClose }) => {
  return (
    <Dialog onClose={handleClose} open={true}>
      <Box
        display={"flex"}
        flexDirection="column"
        width={300}
        pt={1}
        pb={2}
        style={{ alignItems: "center", backgroundColor: "white" }}
      >
        <CheckCircleOutlineIcon style={{ fontSize: 50, color: theme.green }} />
        <Typography variant="h5" mt={2} style={{ color: theme.grey }}>
          e-KYC demo
        </Typography>
        <Typography variant="body" mt={2} mb={3} style={{ color: theme.grey }}>
          Verification Success
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: theme.green, color: "white" }}
          onClick={handleClose}
        >
          OK
        </Button>
      </Box>
    </Dialog>
  );
};

export default SuccessDialog;
