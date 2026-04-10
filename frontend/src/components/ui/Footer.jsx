import React from "react";

const Footer = ({
  copyright,
  links = [],
  backgroundColor = "#f8f9fa",
  borderColor = "#e1e5e9",
  textColor = "#666",
  padding = "medium",
  sticky = false,
  className = "",
  style = {},
}) => {
  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} Your Company. All rights reserved.`;

  const baseStyles = {
    backgroundColor,
    borderTop: `1px solid ${borderColor}`,
    color: textColor,
    position: sticky ? "fixed" : "relative",
    bottom: sticky ? "0" : "auto",
    left: sticky ? "0" : "auto",
    right: sticky ? "0" : "auto",
    zIndex: sticky ? "100" : "auto",
  };

  const paddings = {
    none: { padding: "0" },
    small: { padding: "12px 20px" },
    medium: { padding: "20px 24px" },
    large: { padding: "32px 24px" },
  };

  const containerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    ...paddings[padding],
  };

  const contentStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  };

  const copyrightStyles = {
    fontSize: "14px",
    margin: 0,
    flex: 1,
    minWidth: "200px",
  };

  const linksContainerStyles = {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
  };

  const linkStyles = {
    color: textColor,
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s ease",
  };

  return (
    <footer style={{ ...baseStyles, ...style }} className={className}>
      <div style={containerStyles}>
        <div style={contentStyles}>
          <p style={copyrightStyles}>
            {copyright || defaultCopyright}
          </p>
          
          {links.length > 0 && (
            <div style={linksContainerStyles}>
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  style={linkStyles}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#007bff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = textColor;
                  }}
                  onClick={(e) => {
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick(e);
                    }
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
