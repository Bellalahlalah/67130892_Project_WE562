import React from "react";
import "./style.css";

function Button({ text, onClick, color = "blue", size = "medium" }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: "white",
        padding: size === "large" ? "10px 20px" : "5px 10px",
        fontSize: size === "large" ? "18px" : "14px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}

export default Button;
