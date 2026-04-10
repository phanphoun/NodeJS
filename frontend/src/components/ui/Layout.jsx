import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({
  children,
  header,
  sidebar,
  footer,
  showHeader = true,
  showSidebar = false,
  showFooter = false,
  sidebarPosition = "left",
  sidebarWidth = "250px",
  contentPadding = "24px",
  backgroundColor = "#f8f9fa",
  className = "",
  style = {},
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const baseStyles = {
    minHeight: "100vh",
    backgroundColor,
    display: "flex",
    flexDirection: "column",
  };

  const mainContentStyles = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginLeft: showSidebar && sidebarPosition === "left" && sidebarOpen ? sidebarWidth : "0",
    marginRight: showSidebar && sidebarPosition === "right" && sidebarOpen ? sidebarWidth : "0",
    transition: "margin-left 0.3s ease, margin-right 0.3s ease",
  };

  const contentStyles = {
    flex: 1,
    padding: contentPadding,
    overflow: "auto",
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ ...baseStyles, ...style }} className={className}>
      {showHeader && header && (
        <Header
          {...header}
          style={{
            ...header.style,
            ...(showSidebar && sidebarPosition === "left" && sidebarOpen && { marginLeft: sidebarWidth }),
            ...(showSidebar && sidebarPosition === "right" && sidebarOpen && { marginRight: sidebarWidth }),
            transition: "margin-left 0.3s ease, margin-right 0.3s ease",
          }}
        />
      )}

      <div style={{ display: "flex", flex: 1 }}>
        {showSidebar && sidebar && (
          <Sidebar
            {...sidebar}
            isOpen={sidebarOpen}
            onToggle={handleSidebarToggle}
            position={sidebarPosition}
            width={sidebarWidth}
          />
        )}

        <main style={mainContentStyles}>
          <div style={contentStyles}>
            {children}
          </div>
          
          {showFooter && footer && (
            <Footer
              {...footer}
              style={{
                ...footer.style,
                ...(showSidebar && sidebarPosition === "left" && sidebarOpen && { marginLeft: sidebarWidth }),
                ...(showSidebar && sidebarPosition === "right" && sidebarOpen && { marginRight: sidebarWidth }),
                transition: "margin-left 0.3s ease, margin-right 0.3s ease",
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
