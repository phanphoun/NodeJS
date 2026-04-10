import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Avatar from "./ui/Avatar";
import Badge from "./ui/Badge";
import Input from "./ui/Input";
import Toast from "./ui/Toast";

function Profile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.username || !formData.email) {
            setMessage("Username and email are required");
            return;
        }
        
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setMessage("New passwords do not match");
            return;
        }
        
        // Simulate profile update
        setMessage("Profile updated successfully!");
        setIsEditing(false);
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
    };

    const handleCancel = () => {
        setFormData({
            username: user?.username || "",
            email: user?.email || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setIsEditing(false);
        setMessage("");
    };

    return (
        <div style={{ padding: "2rem" }}>
            <Card variant="elevated" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
                    <Avatar 
                        name={user?.username}
                        size="large"
                        backgroundColor="#007bff"
                    />
                    <div style={{ flex: 1 }}>
                        <h1 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>Profile</h1>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ color: "#666" }}>{user?.username}</span>
                            <Badge variant={
                                user?.role === "admin" ? "danger" : 
                                user?.role === "manager" ? "warning" : 
                                user?.role === "moderator" ? "info" : "success"
                            }>
                                {user?.role}
                            </Badge>
                        </div>
                    </div>
                    <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                </div>
                
                {message && (
                    <Toast 
                        message={message} 
                        type={message.includes("success") ? "success" : "error"} 
                        duration={3000}
                        position="top-center"
                    />
                )}
                
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <div style={{ 
                            display: "grid", 
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
                            gap: "1.5rem" 
                        }}>
                            <Input
                                name="username"
                                label="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                            
                            <Input
                                name="email"
                                type="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            
                            <Input
                                name="currentPassword"
                                type="password"
                                label="Current Password"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                placeholder="Enter current password to confirm changes"
                            />
                            
                            <Input
                                name="newPassword"
                                type="password"
                                label="New Password"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                placeholder="Leave blank to keep current password"
                            />
                            
                            <Input
                                name="confirmPassword"
                                type="password"
                                label="Confirm New Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm new password"
                                error={formData.newPassword && formData.newPassword !== formData.confirmPassword ? "Passwords do not match" : ""}
                            />
                        </div>
                        
                        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", justifyContent: "flex-end" }}>
                            <Button variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                        gap: "1.5rem" 
                    }}>
                        <Card variant="default" style={{ padding: "1.5rem" }}>
                            <h3 style={{ color: "#333", marginBottom: "1rem" }}>Account Information</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <div>
                                    <strong style={{ color: "#666" }}>Username:</strong>
                                    <p style={{ margin: "0.25rem 0", color: "#333" }}>{user?.username}</p>
                                </div>
                                <div>
                                    <strong style={{ color: "#666" }}>Email:</strong>
                                    <p style={{ margin: "0.25rem 0", color: "#333" }}>{user?.email}</p>
                                </div>
                                <div>
                                    <strong style={{ color: "#666" }}>Role:</strong>
                                    <p style={{ margin: "0.25rem 0", color: "#333" }}>{user?.role}</p>
                                </div>
                            </div>
                        </Card>
                        
                        <Card variant="default" style={{ padding: "1.5rem" }}>
                            <h3 style={{ color: "#333", marginBottom: "1rem" }}>Account Status</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <div>
                                    <strong style={{ color: "#666" }}>Status:</strong>
                                    <div style={{ marginTop: "0.25rem" }}>
                                        <Badge variant="success">Active</Badge>
                                    </div>
                                </div>
                                <div>
                                    <strong style={{ color: "#666" }}>Member Since:</strong>
                                    <p style={{ margin: "0.25rem 0", color: "#333" }}>Today</p>
                                </div>
                                <div>
                                    <strong style={{ color: "#666" }}>Last Login:</strong>
                                    <p style={{ margin: "0.25rem 0", color: "#333" }}>Just now</p>
                                </div>
                            </div>
                        </Card>
                        
                        <Card variant="default" style={{ padding: "1.5rem" }}>
                            <h3 style={{ color: "#333", marginBottom: "1rem" }}>Quick Actions</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <Button variant="outline" size="small" style={{ width: "100%" }}>
                                    Change Password
                                </Button>
                                <Button variant="outline" size="small" style={{ width: "100%" }}>
                                    Export Data
                                </Button>
                                <Button variant="danger" size="small" style={{ width: "100%" }}>
                                    Delete Account
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default Profile;