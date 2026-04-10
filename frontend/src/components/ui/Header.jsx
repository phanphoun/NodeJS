import React from "react";

const Header = ({
  title,
  subtitle,
  leftContent,
  rightContent,
  backgroundColor = "#ffffff",
  borderColor = "#e1e5e9",
  padding = "medium",
  shadow = false,
  sticky = false,
  className = "",
  style = {},
}) => {
  const baseStyles = {
    backgroundColor,
    borderBottom: `1px solid ${borderColor}`,
    position: sticky ? "sticky" : "relative",
    top: sticky ? "0" : "auto",
    zIndex: sticky ? "100" : "auto",
    boxShadow: shadow ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
  };

  const paddings = {
    none: { padding: "0" },
    small: { padding: "12px 20px" },
    medium: { padding: "16px 24px" },
    large: { padding: "20px 32px" },
  };

  const containerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    ...paddings[padding],
  };

  const leftStyles = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
  };

  const centerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 2,
  };

  const rightStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "12px",
    flex: 1,
  };

  const titleStyles = {
    margin: 0,
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  };

  const subtitleStyles = {
    margin: "4px 0 0 0",
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
  };

  return (
    <header style={{ ...baseStyles, ...style }} className={className}>
      <div style={containerStyles}>
        <div style={leftStyles}>
          {leftContent}
        </div>
        
        <div style={centerStyles}>
          {title && <h1 style={titleStyles}>{title}</h1>}
          {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        </div>
        
        <div style={rightStyles}>
          {rightContent}
        </div>
      </div>
    </header>
  );
};

export default Header;
