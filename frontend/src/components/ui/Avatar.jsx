import React from "react";

const Avatar = ({
  src,
  alt,
  size = "medium",
  name,
  fallbackText,
  backgroundColor = "#007bff",
  textColor = "white",
  border = false,
  borderColor = "#e1e5e9",
  shape = "circle",
  className = "",
  style = {},
  onClick,
}) => {
  const sizes = {
    small: {
      width: "32px",
      height: "32px",
      fontSize: "12px",
    },
    medium: {
      width: "48px",
      height: "48px",
      fontSize: "16px",
    },
    large: {
      width: "64px",
      height: "64px",
      fontSize: "20px",
    },
    xlarge: {
      width: "96px",
      height: "96px",
      fontSize: "28px",
    },
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    color: textColor,
    backgroundColor: src ? "transparent" : backgroundColor,
    backgroundImage: src ? `url(${src})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    border: border ? `2px solid ${borderColor}` : "none",
    cursor: onClick ? "pointer" : "default",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    overflow: "hidden",
    ...sizes[size],
  };

  const shapeStyles = {
    circle: {
      borderRadius: "50%",
    },
    square: {
      borderRadius: "4px",
    },
    rounded: {
      borderRadius: "8px",
    },
  };

  const avatarStyle = {
    ...baseStyles,
    ...shapeStyles[shape],
    ...style,
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleMouseEnter = (e) => {
    if (onClick) {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    }
  };

  const handleMouseLeave = (e) => {
    if (onClick) {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "none";
    }
  };

  return (
    <div
      style={avatarStyle}
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={name || alt}
    >
      {!src && (fallbackText || getInitials(name))}
      {src && (
        <img
          src={src}
          alt={alt || name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
