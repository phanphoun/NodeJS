import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Toast from "../ui/Toast";
import Loading from "../ui/Loading";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register, error } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const result = await register(username, email, password, role);
        
        if (result.success) {
            navigate("/dashboard");
        }
        
        setLoading(false);
    };
    
    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
            <Card variant="elevated" style={{ padding: "2rem" }}>
                <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
                    Register
                </h1>
                
                {error && (
                    <Toast 
                        message={error} 
                        type="error" 
                        duration={0}
                        position="top-center"
                    />
                )}
                
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        label="Username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        error={error && !username ? "Username is required" : ""}
                    />
                    
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        error={error && !email ? "Email is required" : ""}
                    />
                    
                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        error={error && !password ? "Password is required" : ""}
                    />
                    
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ 
                            display: "block", 
                            marginBottom: "6px", 
                            fontSize: "14px", 
                            fontWeight: "500", 
                            color: "#333" 
                        }}>
                            Role
                        </label>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            style={{ 
                                width: "100%", 
                                padding: "8px 12px", 
                                border: "1px solid #ddd", 
                                borderRadius: "4px",
                                fontSize: "16px",
                                fontFamily: "inherit",
                                backgroundColor: "white",
                                boxSizing: "border-box"
                            }}
                        >
                            <option value="user">User</option>
                            <option value="manager">Manager</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    
                    <Button 
                        type="submit"
                        disabled={loading}
                        loading={loading}
                        variant="success"
                        size="large"
                        style={{ 
                            width: "100%", 
                            marginTop: "1rem"
                        }}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>
                </form>
                
                <p style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
                    Already have an account? 
                    <a 
                        href="/login" 
                        style={{ color: "#007bff", textDecoration: "none", marginLeft: "5px" }}
                        onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                        onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                    >
                        Login
                    </a>
                </p>
            </Card>
        </div>
    );
};

export default Register;