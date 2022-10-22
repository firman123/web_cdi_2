import React from "react";

const TextInputCorner = (props) => {
  return (
    <input
      type={"text"}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(value) => props.onChange(value.target.value)}
      style={{
        height: 40,
        width: "100%",
        background: "#FFFFFF",
        border: "1px solid #A35869",
        borderRadius: "50px",
        paddingLeft: 10,
        paddingRight: 10,
        boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
        textAlign: "center",
      }}
    />
  );
};

export default TextInputCorner;
