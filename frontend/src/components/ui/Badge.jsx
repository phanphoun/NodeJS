import React from "react";

const Badge = ({
  children,
  variant = "primary",
  size = "medium",
  shape = "rounded",
  dot = false,
  count,
  max = 99,
  className = "",
  style = {},
}) => {
  const variants = {
    primary: {
      backgroundColor: "#007bff",
      color: "white",
    },
    secondary: {
      backgroundColor: "#6c757d",
      color: "white",
    },
    success: {
      backgroundColor: "#28a745",
      color: "white",
    },
    danger: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    warning: {
      backgroundColor: "#ffc107",
      color: "#333",
    },
    info: {
      backgroundColor: "#17a2b8",
      color: "white",
    },
    light: {
      backgroundColor: "#f8f9fa",
      color: "#333",
      border: "1px solid #dee2e6",
    },
    dark: {
      backgroundColor: "#343a40",
      color: "white",
    },
  };

  const sizes = {
    small: {
      fontSize: "10px",
      padding: "2px 6px",
      minWidth: "16px",
      height: "16px",
    },
    medium: {
      fontSize: "12px",
      padding: "4px 8px",
      minWidth: "20px",
      height: "20px",
    },
    large: {
      fontSize: "14px",
      padding: "6px 12px",
      minWidth: "24px",
      height: "24px",
    },
  };

  const shapes = {
    rounded: {
      borderRadius: "12px",
    },
    square: {
      borderRadius: "2px",
    },
    circle: {
      borderRadius: "50%",
    },
    pill: {
      borderRadius: "50px",
    },
  };

  const dotSizes = {
    small: {
      width: "6px",
      height: "6px",
    },
    medium: {
      width: "8px",
      height: "8px",
    },
    large: {
      width: "10px",
      height: "10px",
    },
  };

  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    lineHeight: "1",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    transition: "all 0.2s ease",
  };

  const badgeStyle = dot
    ? {
        ...baseStyles,
        ...variants[variant],
        ...dotSizes[size],
        borderRadius: "50%",
        padding: 0,
      }
    : {
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
        ...shapes[shape],
      };

  const displayCount = count && count > max ? `${max}+` : count;

  return (
    <span style={{ ...badgeStyle, ...style }} className={className}>
      {dot ? null : count !== undefined ? displayCount : children}
    </span>
  );
};

// Badge with positioning for notification indicators
export const BadgeWithPosition = ({
  children,
  badgeProps = {},
  position = "top-right",
  offset = { x: 0, y: 0 },
  className = "",
  style = {},
}) => {
  const containerStyles = {
    position: "relative",
    display: "inline-flex",
    ...style,
  };

  const positions = {
    "top-right": {
      top: offset.y || "-4px",
      right: offset.x || "-4px",
    },
    "top-left": {
      top: offset.y || "-4px",
      left: offset.x || "-4px",
    },
    "bottom-right": {
      bottom: offset.y || "-4px",
      right: offset.x || "-4px",
    },
    "bottom-left": {
      bottom: offset.y || "-4px",
      left: offset.x || "-4px",
    },
  };

  const badgeContainerStyles = {
    position: "absolute",
    zIndex: 1,
    transform: "translate(50%, -50%)",
    ...positions[position],
  };

  return (
    <div style={containerStyles} className={className}>
      {children}
      <div style={badgeContainerStyles}>
        <Badge {...badgeProps} />
      </div>
    </div>
  );
};

export default Badge;
