import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";
import Avatar from "./ui/Avatar";
import Badge from "./ui/Badge";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav style={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
      padding: "1rem 2rem", 
      marginBottom: "0",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backdropFilter: "blur(10px)"
    }}>
      {/* Logo and Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <Link 
          to="/" 
          style={{ 
            color: "white", 
            textDecoration: "none", 
            fontSize: "1.5rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <span style={{ 
            fontSize: "2rem",
            background: "linear-gradient(45deg, #fff, #f0f0f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            🎓
          </span>
          EDUC
        </Link>
        
        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {user && (
            <>
              <Link 
                to="/dashboard" 
                style={{ 
                  color: "white", 
                  textDecoration: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  fontSize: "0.9rem",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                📊 Dashboard
              </Link>
              
              {user.role === "admin" && (
                <Link 
                  to="/admin" 
                  style={{ 
                    color: "white", 
                    textDecoration: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    fontSize: "0.9rem",
                    fontWeight: "500"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  ⚙️ Admin
                </Link>
              )}
              
              {user.role === "manager" && (
                <Link 
                  to="/manager" 
                  style={{ 
                    color: "white", 
                    textDecoration: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    fontSize: "0.9rem",
                    fontWeight: "500"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  👥 Manager
                </Link>
              )}
              
              {user.role === "moderator" && (
                <Link 
                  to="/moderator" 
                  style={{ 
                    color: "white", 
                    textDecoration: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    fontSize: "0.9rem",
                    fontWeight: "500"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  🛡️ Moderator
                </Link>
              )}
              
              <Link 
                to="/profile" 
                style={{ 
                  color: "white", 
                  textDecoration: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  fontSize: "0.9rem",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                👤 Profile
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* User Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {user ? (
          <>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.75rem",
              padding: "0.5rem 1rem",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}>
              <Avatar 
                name={user.username}
                size="small"
                backgroundColor="#ffffff"
              />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span style={{ 
                  color: "white", 
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  lineHeight: "1"
                }}>
                  {user.username}
                </span>
                <Badge 
                  variant={
                    user.role === "admin" ? "danger" : 
                    user.role === "manager" ? "warning" : 
                    user.role === "moderator" ? "info" : "success"
                  }
                  size="small"
                  style={{ marginTop: "2px" }}
                >
                  {user.role}
                </Badge>
              </div>
            </div>
            
            <Button 
              onClick={handleLogout}
              variant="danger"
              size="small"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
                fontWeight: "500"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              🚪 Logout
            </Button>
          </>
        ) : (
          <>
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              size="small"
              style={{
                backgroundColor: "transparent",
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                fontWeight: "500"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
              }}
            >
              🔑 Login
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              variant="success"
              size="small"
              style={{
                backgroundColor: "rgba(40, 167, 69, 0.8)",
                color: "white",
                border: "1px solid rgba(40, 167, 69, 0.9)",
                backdropFilter: "blur(10px)",
                fontWeight: "500"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(40, 167, 69, 1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(40, 167, 69, 0.8)";
              }}
            >
              ✨ Register
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
