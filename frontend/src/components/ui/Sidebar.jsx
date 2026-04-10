import React, { useState } from "react";

const Sidebar = ({
  isOpen = true,
  onToggle,
  items = [],
  activeItem,
  onItemClick,
  position = "left",
  width = "250px",
  backgroundColor = "#ffffff",
  borderColor = "#e1e5e9",
  className = "",
  style = {},
}) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const baseStyles = {
    backgroundColor,
    borderRight: position === "left" ? `1px solid ${borderColor}` : "none",
    borderLeft: position === "right" ? `1px solid ${borderColor}` : "none",
    width: isOpen ? width : "60px",
    height: "100vh",
    position: "fixed",
    top: 0,
    [position]: 0,
    transition: "width 0.3s ease",
    zIndex: 1000,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const toggleButtonStyles = {
    position: "absolute",
    top: "20px",
    [position === "left" ? "right" : "left"]: "-20px",
    width: "40px",
    height: "40px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: position === "left" ? "0 4px 4px 0" : "4px 0 0 4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: 1001,
  };

  const contentStyles = {
    flex: 1,
    overflowY: "auto",
    padding: "20px 0",
  };

  const itemStyles = {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left",
    fontSize: "14px",
    color: "#333",
    textDecoration: "none",
    gap: "12px",
  };

  const activeItemStyles = {
    ...itemStyles,
    backgroundColor: "#007bff",
    color: "white",
  };

  const iconStyles = {
    fontSize: "18px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
  };

  const textStyles = {
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const submenuStyles = {
    paddingLeft: "44px",
    backgroundColor: "#f8f9fa",
  };

  const handleItemClick = (item) => {
    if (item.children && item.children.length > 0) {
      const newExpanded = new Set(expandedItems);
      if (newExpanded.has(item.id)) {
        newExpanded.delete(item.id);
      } else {
        newExpanded.add(item.id);
      }
      setExpandedItems(newExpanded);
    } else {
      onItemClick && onItemClick(item);
    }
  };

  const renderMenuItem = (item, level = 0) => {
    const isActive = activeItem === item.id;
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        <button
          style={isActive ? activeItemStyles : itemStyles}
          onClick={() => handleItemClick(item)}
        >
          {item.icon && <span style={iconStyles}>{item.icon}</span>}
          {isOpen && (
            <>
              <span style={textStyles}>{item.label}</span>
              {hasChildren && (
                <span style={{ fontSize: "12px", transition: "transform 0.2s ease" }}>
                  {isExpanded ? "▼" : "▶"}
                </span>
              )}
            </>
          )}
        </button>
        
        {hasChildren && isOpen && isExpanded && (
          <div style={submenuStyles}>
            {item.children.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div style={{ ...baseStyles, ...style }} className={className}>
        {onToggle && (
          <button style={toggleButtonStyles} onClick={onToggle}>
            {isOpen ? (position === "left" ? "◀" : "▶") : (position === "left" ? "▶" : "◀")}
          </button>
        )}
        
        <div style={contentStyles}>
          {items.map((item) => renderMenuItem(item))}
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: window.innerWidth <= 768 ? "block" : "none",
          }}
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;
