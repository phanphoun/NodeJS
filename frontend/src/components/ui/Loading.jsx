import React from "react";

const Loading = ({
  size = "medium",
  color = "#007bff",
  text,
  overlay = false,
  className = "",
  style = {},
}) => {
  const sizes = {
    small: {
      width: "20px",
      height: "20px",
      borderWidth: "2px",
    },
    medium: {
      width: "40px",
      height: "40px",
      borderWidth: "3px",
    },
    large: {
      width: "60px",
      height: "60px",
      borderWidth: "4px",
    },
  };

  const spinnerStyles = {
    border: `${sizes[size].borderWidth} solid transparent`,
    borderTop: `${sizes[size].borderWidth} solid ${color}`,
    borderRadius: "50%",
    width: sizes[size].width,
    height: sizes[size].height,
    animation: "spin 1s linear infinite",
    display: "inline-block",
  };

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "20px",
  };

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const textStyles = {
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
  };

  const LoadingContent = () => (
    <div style={containerStyles} className={className}>
      <div style={{ ...spinnerStyles, ...style }} />
      {text && <div style={textStyles}>{text}</div>}
    </div>
  );

  if (overlay) {
    return (
      <div style={overlayStyles}>
        <LoadingContent />
      </div>
    );
  }

  return <LoadingContent />;
};

// Add CSS animation
const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default Loading;
