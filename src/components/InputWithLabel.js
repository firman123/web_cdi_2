import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputWithLabel = ({
  label,
  value,
  onChangeInput,
  showLabel = true,
  widthLabel,
  type,
  maxLength,
  isCalendar = false,
  startDate = new Date(),
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {showLabel && (
        <Typography
          color={"#3E4462"}
          sx={{
            width: widthLabel || 300,
            textAlign: "left",
            fontFamily: "Poppins",
          }}
          fontSize={12}
        >
          {label}
        </Typography>
      )}

      {isCalendar ? (
        <DatePicker
          selected={startDate}
          onChange={(date) => onChangeInput(date)}
          className="tanggal"
        />
      ) : (
        <input
          type={type || "text"}
          value={value}
          onChange={(event) => onChangeInput(event.target.value)}
          style={{
            background: "#F1F2F4",
            border: "1px solid #000000",
            boxSizing: "border-box",
            padding: 4,
            width: "100%",
          }}
          maxLength={maxLength}
        />
      )}
    </Box>
  );
};

export default InputWithLabel;
