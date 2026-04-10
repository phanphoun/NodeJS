import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Avatar from "./ui/Avatar";
import Badge from "./ui/Badge";
import Loading from "./ui/Loading";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Loading text="Please login to access dashboard" />
      </div>
    );
  }

  const handleRoleNavigation = () => {
    switch (user.role) {
      case "admin":
        navigate("/admin");
        break;
      case "manager":
        navigate("/manager");
        break;
      case "moderator":
        navigate("/moderator");
        break;
      default:
        navigate("/user");
        break;
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Card 
        variant="elevated"
        style={{ 
          maxWidth: "600px", 
          margin: "0 auto",
          textAlign: "center"
        }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <Avatar 
            name={user.username}
            size="large"
            backgroundColor="#007bff"
          />
        </div>
        
        <h1 style={{ marginBottom: "1rem", color: "#333" }}>
          Welcome to Dashboard
        </h1>
        
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            Hello, <strong>{user.username}</strong>!
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span>Your role:</span>
            <Badge 
              variant={
                user.role === "admin" ? "danger" : 
                user.role === "manager" ? "warning" : 
                user.role === "moderator" ? "info" : "success"
              }
              size="medium"
            >
              {user.role}
            </Badge>
          </div>
          <p style={{ color: "#666", margin: 0 }}>
            Email: {user.email}
          </p>
        </div>
    
        <div style={{ marginTop: "2rem" }}>
          <Button 
            onClick={handleRoleNavigation}
            variant="primary"
            size="large"
            style={{
              padding: "1rem 2rem",
              fontSize: "1rem"
            }}
          >
            Go to {
              user.role === "admin" ? "Admin" : 
              user.role === "manager" ? "Manager" : 
              user.role === "moderator" ? "Moderator" : "User"
            } Page
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
