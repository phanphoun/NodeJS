import React from "react";

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  size = "medium",
  disabled = false,
  loading = false,
  className = "",
  style = {},
  ...props 
}) => {
  const baseStyles = {
    border: "none",
    borderRadius: "4px",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    fontFamily: "inherit",
    fontWeight: "500",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const variants = {
    primary: {
      backgroundColor: disabled || loading ? "#ccc" : "#007bff",
      color: "white",
    },
    secondary: {
      backgroundColor: disabled || loading ? "#f8f9fa" : "#6c757d",
      color: "white",
    },
    success: {
      backgroundColor: disabled || loading ? "#ccc" : "#28a745",
      color: "white",
    },
    danger: {
      backgroundColor: disabled || loading ? "#ccc" : "#dc3545",
      color: "white",
    },
    outline: {
      backgroundColor: "transparent",
      color: disabled || loading ? "#ccc" : "#007bff",
      border: "1px solid " + (disabled || loading ? "#ccc" : "#007bff"),
    },
  };

  const sizes = {
    small: {
      padding: "6px 12px",
      fontSize: "14px",
    },
    medium: {
      padding: "8px 16px",
      fontSize: "16px",
    },
    large: {
      padding: "12px 24px",
      fontSize: "18px",
    },
  };

  const buttonStyle = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={buttonStyle}
      className={className}
      {...props}
    >
      {loading && (
        <span
          style={{
            width: "16px",
            height: "16px",
            border: "2px solid transparent",
            borderTop: "2px solid currentColor",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
