import { useAuth } from "../../../context/AuthContext";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Avatar from "../../ui/Avatar";
import Badge from "../../ui/Badge";

function UserPage() {
    const { user } = useAuth();

    return (
        <div style={{ padding: "2rem" }}>
            <Card variant="elevated" style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
                    <Avatar 
                        name={user?.username}
                        size="large"
                        backgroundColor="#28a745"
                    />
                    <div>
                        <h1 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>User Dashboard</h1>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ color: "#666" }}>Welcome, {user?.username}</span>
                            <Badge variant="success" size="medium">
                                {user?.role}
                            </Badge>
                        </div>
                    </div>
                </div>
                
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                    gap: "1.5rem" 
                }}>
                    <Card variant="default" style={{ padding: "1.5rem", textAlign: "center" }}>
                        <h3 style={{ color: "#007bff", marginBottom: "1rem" }}>📊 Profile</h3>
                        <p style={{ color: "#666", marginBottom: "1rem" }}>View and edit your profile information</p>
                        <Button variant="outline" size="small">View Profile</Button>
                    </Card>
                    
                    <Card variant="default" style={{ padding: "1.5rem", textAlign: "center" }}>
                        <h3 style={{ color: "#28a745", marginBottom: "1rem" }}>📝 Settings</h3>
                        <p style={{ color: "#666", marginBottom: "1rem" }}>Manage your account settings</p>
                        <Button variant="outline" size="small">Settings</Button>
                    </Card>
                    
                    <Card variant="default" style={{ padding: "1.5rem", textAlign: "center" }}>
                        <h3 style={{ color: "#ffc107", marginBottom: "1rem" }}>📈 Activity</h3>
                        <p style={{ color: "#666", marginBottom: "1rem" }}>View your recent activity</p>
                        <Button variant="outline" size="small">Activity Log</Button>
                    </Card>
                    
                    <Card variant="default" style={{ padding: "1.5rem", textAlign: "center" }}>
                        <h3 style={{ color: "#dc3545", marginBottom: "1rem" }}>🔔 Notifications</h3>
                        <p style={{ color: "#666", marginBottom: "1rem" }}>Manage your notifications</p>
                        <Button variant="outline" size="small">Notifications</Button>
                    </Card>
                </div>
                
                <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                    <h3 style={{ color: "#333", marginBottom: "1rem" }}>User Information</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                        <div>
                            <strong style={{ color: "#666" }}>Email:</strong>
                            <p style={{ margin: "0.25rem 0", color: "#333" }}>{user?.email}</p>
                        </div>
                        <div>
                            <strong style={{ color: "#666" }}>Role:</strong>
                            <p style={{ margin: "0.25rem 0", color: "#333" }}>{user?.role}</p>
                        </div>
                        <div>
                            <strong style={{ color: "#666" }}>Status:</strong>
                            <p style={{ margin: "0.25rem 0", color: "#333" }}>Active</p>
                        </div>
                        <div>
                            <strong style={{ color: "#666" }}>Member Since:</strong>
                            <p style={{ margin: "0.25rem 0", color: "#333" }}>Today</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default UserPage;