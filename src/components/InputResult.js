import { Typography } from "@mui/material";

const InputResult = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography fontFamily={"Poppins"} color={"#21213B"} textAlign={"left"}>
        {props.label}
      </Typography>
      <input
        type={"text"}
        value={props.value}
        onChange={(value) => props.onChange(value.target.value)}
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E2E2",
          boxSizing: "border-box",
          borderRadius: "8px",
          fontFamily: "Poppins",
          padding: 8,
        }}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputResult;
