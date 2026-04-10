import React, { useEffect } from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = "",
  style = {},
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalStyles = {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    maxHeight: "90vh",
    overflow: "auto",
    position: "relative",
  };

  const sizes = {
    small: {
      width: "90%",
      maxWidth: "400px",
    },
    medium: {
      width: "90%",
      maxWidth: "600px",
    },
    large: {
      width: "90%",
      maxWidth: "800px",
    },
    fullscreen: {
      width: "95%",
      height: "95%",
      maxWidth: "none",
      maxHeight: "none",
    },
  };

  const headerStyles = {
    padding: "20px 24px",
    borderBottom: "1px solid #eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const titleStyles = {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
  };

  const closeButtonStyles = {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
    padding: "0",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    transition: "background-color 0.2s ease",
  };

  const bodyStyles = {
    padding: "24px",
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={overlayStyles} onClick={handleOverlayClick}>
      <div
        style={{
          ...modalStyles,
          ...sizes[size],
          ...style,
        }}
        className={className}
      >
        {(title || showCloseButton) && (
          <div style={headerStyles}>
            {title && <h2 style={titleStyles}>{title}</h2>}
            {showCloseButton && (
              <button
                style={closeButtonStyles}
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                ×
              </button>
            )}
          </div>
        )}
        <div style={bodyStyles}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
