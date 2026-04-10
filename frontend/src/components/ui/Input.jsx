import React from "react";

const Input = ({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  className = "",
  style = {},
  containerStyle = {},
  ...props
}) => {
  const baseStyles = {
    width: "100%",
    padding: "8px 12px",
    border: error ? "1px solid #dc3545" : "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    fontFamily: "inherit",
    transition: "border-color 0.2s ease",
    backgroundColor: disabled ? "#f8f9fa" : "white",
    color: disabled ? "#6c757d" : "#333",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyles = {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  };

  const errorStyles = {
    color: "#dc3545",
    fontSize: "12px",
    marginTop: "4px",
  };

  const containerStyles = {
    marginBottom: "16px",
    ...containerStyle,
  };

  return (
    <div style={containerStyles} className={className}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: "#dc3545", marginLeft: "4px" }}>*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        style={{
          ...baseStyles,
          ...style,
        }}
        {...props}
      />
      {error && <div style={errorStyles}>{error}</div>}
    </div>
  );
};

export default Input;
