import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Avatar from "../../ui/Avatar";
import Badge from "../../ui/Badge";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Toast from "../../ui/Toast";

function AdminPage() {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Mock data for demonstration
    const users = [
        { id: 1, username: "john_doe", email: "john@example.com", role: "user", status: "active" },
        { id: 2, username: "jane_smith", email: "jane@example.com", role: "admin", status: "active" },
        { id: 3, username: "bob_wilson", email: "bob@example.com", role: "manager", status: "inactive" },
    ];

    const columns = [
        { key: "username", title: "Username", sortable: true },
        { key: "email", title: "Email", sortable: true },
        { key: "role", title: "Role", render: (role) => (
            <Badge variant={role === "admin" ? "danger" : role === "manager" ? "warning" : "success"}>
                {role}
            </Badge>
        )},
        { key: "status", title: "Status", render: (status) => (
            <Badge variant={status === "active" ? "success" : "secondary"}>
                {status}
            </Badge>
        )},
        { key: "actions", title: "Actions", render: (_, user) => (
            <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button 
                    variant="outline" 
                    size="small"
                    onClick={() => {
                        setSelectedUser(user);
                        setShowModal(true);
                    }}
                >
                    Edit
                </Button>
                <Button variant="danger" size="small">Delete</Button>
            </div>
        )},
    ];

    const stats = [
        { label: "Total Users", value: "1,234", color: "#007bff" },
        { label: "Active Users", value: "987", color: "#28a745" },
        { label: "Admins", value: "12", color: "#dc3545" },
        { label: "Managers", value: "45", color: "#ffc107" },
    ];

    return (
        <div style={{ padding: "2rem" }}>
            <Card variant="elevated" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
                    <Avatar 
                        name={user?.username}
                        size="large"
                        backgroundColor="#dc3545"
                    />
                    <div>
                        <h1 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>Admin Dashboard</h1>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ color: "#666" }}>Welcome, {user?.username}</span>
                            <Badge variant="danger" size="medium">
                                {user?.role}
                            </Badge>
                        </div>
                    </div>
                </div>
                
                {/* Stats Cards */}
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                    gap: "1rem", 
                    marginBottom: "2rem" 
                }}>
                    {stats.map((stat, index) => (
                        <Card key={index} variant="default" style={{ padding: "1.5rem", textAlign: "center" }}>
                            <h3 style={{ color: stat.color, margin: "0 0 0.5rem 0", fontSize: "2rem" }}>
                                {stat.value}
                            </h3>
                            <p style={{ margin: 0, color: "#666" }}>{stat.label}</p>
                        </Card>
                    ))}
                </div>
                
                {/* Admin Actions */}
                <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ color: "#333", marginBottom: "1rem" }}>Admin Actions</h2>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <Button variant="primary" onClick={() => setShowModal(true)}>
                            Add New User
                        </Button>
                        <Button variant="secondary">Export Data</Button>
                        <Button variant="warning">System Settings</Button>
                        <Button variant="danger">Backup Database</Button>
                    </div>
                </div>
                
                {/* Users Table */}
                <div>
                    <h2 style={{ color: "#333", marginBottom: "1rem" }}>User Management</h2>
                    <Table 
                        columns={columns}
                        data={users}
                        sortable={true}
                        selectable={true}
                        pagination={true}
                        currentPage={1}
                        totalPages={5}
                    />
                </div>
            </Card>
            
            {/* Edit User Modal */}
            <Modal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={selectedUser ? "Edit User" : "Add New User"}
                size="medium"
            >
                <div>
                    <p style={{ color: "#666", marginBottom: "1rem" }}>
                        {selectedUser ? `Editing user: ${selectedUser.username}` : "Create a new user account"}
                    </p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                        <Button variant="outline" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary">
                            {selectedUser ? "Save Changes" : "Create User"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AdminPage;