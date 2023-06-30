import React from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

// maxStar = 5 mean set default value
export default function StarRating({ maxStar = 5 }) {
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxStar }, (_, i) => (
          <span key={i + 1}>s{i + 1}</span>
        ))}
      </div>
      <p style={textStyle}>{maxStar}</p>
    </div>
  );
}
