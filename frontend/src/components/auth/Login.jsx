import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Toast from "../ui/Toast";
import Loading from "../ui/Loading";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, error } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const result = await login(email, password);
        
        if (result.success) {
            navigate("/dashboard");
        }
        
        setLoading(false);
    };
    
    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
            <Card variant="elevated" style={{ padding: "2rem" }}>
                <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
                    Login
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
                    
                    <Button 
                        type="submit"
                        disabled={loading}
                        loading={loading}
                        variant="primary"
                        size="large"
                        style={{ 
                            width: "100%", 
                            marginTop: "1rem"
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
                
                <p style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
                    Don't have an account? 
                    <a 
                        href="/register" 
                        style={{ color: "#007bff", textDecoration: "none", marginLeft: "5px" }}
                        onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                        onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                    >
                        Register
                    </a>
                </p>
            </Card>
        </div>
    );
};

export default Login;