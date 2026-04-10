import React from "react";

const Card = ({
  children,
  title,
  subtitle,
  footer,
  variant = "default",
  padding = "medium",
  shadow = true,
  hover = false,
  className = "",
  style = {},
  headerStyle = {},
  bodyStyle = {},
  footerStyle = {},
}) => {
  const baseStyles = {
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const variants = {
    default: {
      border: "1px solid #e1e5e9",
    },
    elevated: {
      border: "none",
      boxShadow: shadow ? "0 2px 8px rgba(0, 0, 0, 0.1)" : "none",
    },
    outlined: {
      border: "2px solid #007bff",
    },
    danger: {
      border: "1px solid #dc3545",
      backgroundColor: "#fff5f5",
    },
    success: {
      border: "1px solid #28a745",
      backgroundColor: "#f8fff9",
    },
  };

  const paddings = {
    none: { padding: "0" },
    small: { padding: "12px" },
    medium: { padding: "20px" },
    large: { padding: "32px" },
  };

  const headerStyles = {
    borderBottom: "1px solid #e1e5e9",
    padding: paddings[padding].padding,
    backgroundColor: "#f8f9fa",
  };

  const titleStyles = {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  };

  const subtitleStyles = {
    margin: "4px 0 0 0",
    fontSize: "14px",
    color: "#666",
  };

  const bodyStyles = {
    padding: paddings[padding].padding,
  };

  const footerStyles = {
    borderTop: "1px solid #e1e5e9",
    padding: paddings[padding].padding,
    backgroundColor: "#f8f9fa",
  };

  const cardStyle = {
    ...baseStyles,
    ...variants[variant],
    ...(hover && {
      cursor: "pointer",
    }),
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (hover) {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.15)";
    }
  };

  const handleMouseLeave = (e) => {
    if (hover) {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = variants[variant].boxShadow || "none";
    }
  };

  return (
    <div
      style={cardStyle}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {(title || subtitle) && (
        <div style={{ ...headerStyles, ...headerStyle }}>
          {title && <h3 style={titleStyles}>{title}</h3>}
          {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        </div>
      )}
      <div style={{ ...bodyStyles, ...bodyStyle }}>{children}</div>
      {footer && (
        <div style={{ ...footerStyles, ...footerStyle }}>{footer}</div>
      )}
    </div>
  );
};

export default Card;
