import React, { useState, useEffect } from "react";

const Toast = ({ message, type = "info", duration = 3000, onClose, position = "top-right" }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onClose && onClose();
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  const types = {
    success: {
      backgroundColor: "#28a745",
      icon: "✓",
    },
    error: {
      backgroundColor: "#dc3545",
      icon: "✕",
    },
    warning: {
      backgroundColor: "#ffc107",
      icon: "⚠",
      color: "#333",
    },
    info: {
      backgroundColor: "#17a2b8",
      icon: "ℹ",
    },
  };

  const positions = {
    "top-right": {
      top: "20px",
      right: "20px",
    },
    "top-left": {
      top: "20px",
      left: "20px",
    },
    "bottom-right": {
      bottom: "20px",
      right: "20px",
    },
    "bottom-left": {
      bottom: "20px",
      left: "20px",
    },
    "top-center": {
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "bottom-center": {
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
    },
  };

  const toastStyles = {
    position: "fixed",
    backgroundColor: types[type].backgroundColor,
    color: types[type].color || "white",
    padding: "12px 16px",
    borderRadius: "4px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    minWidth: "250px",
    maxWidth: "400px",
    zIndex: 10000,
    transition: "all 0.3s ease",
    opacity: isVisible ? 1 : 0,
    transform: isVisible 
      ? positions[position].transform || "translateX(0)"
      : positions[position].transform 
        ? positions[position].transform.replace("translateX(-50%)", "translateX(-50%) translateY(-20px)")
        : "translateX(100%)",
    ...positions[position],
  };

  const iconStyles = {
    fontSize: "18px",
    fontWeight: "bold",
    flexShrink: 0,
  };

  const messageStyles = {
    flex: 1,
    fontSize: "14px",
    lineHeight: "1.4",
  };

  const closeButtonStyles = {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
    padding: "0",
    marginLeft: "8px",
    opacity: 0.8,
    transition: "opacity 0.2s ease",
  };

  return (
    <div style={toastStyles}>
      <span style={iconStyles}>{types[type].icon}</span>
      <span style={messageStyles}>{message}</span>
      <button
        style={closeButtonStyles}
        onClick={handleClose}
        onMouseEnter={(e) => {
          e.target.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "0.8";
        }}
      >
        ×
      </button>
    </div>
  );
};

// Toast Container for managing multiple toasts
export const ToastContainer = ({ toasts = [], onRemove }) => {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          position={toast.position}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </>
  );
};

export default Toast;
