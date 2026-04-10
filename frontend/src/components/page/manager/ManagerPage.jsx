import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Avatar from "../../ui/Avatar";
import Badge from "../../ui/Badge";
import Table from "../../ui/Table";

function ManagerPage() {
    const { user } = useAuth();

    // Mock data for demonstration
    const teamMembers = [
        { id: 1, name: "Alice Johnson", role: "Developer", status: "active", projects: 5 },
        { id: 2, name: "Bob Smith", role: "Designer", status: "active", projects: 3 },
        { id: 3, name: "Carol Williams", role: "Developer", status: "on_leave", projects: 2 },
        { id: 4, name: "David Brown", role: "QA Engineer", status: "active", projects: 4 },
    ];

    const projects = [
        { id: 1, name: "Website Redesign", status: "in_progress", progress: 75, deadline: "2024-03-15" },
        { id: 2, name: "Mobile App", status: "planning", progress: 25, deadline: "2024-04-01" },
        { id: 3, name: "API Development", status: "completed", progress: 100, deadline: "2024-02-28" },
    ];

    const teamColumns = [
        { key: "name", title: "Name", sortable: true },
        { key: "role", title: "Role", render: (role) => (
            <Badge variant="info" size="small">{role}</Badge>
        )},
        { key: "status", title: "Status", render: (status) => (
            <Badge 
                variant={status === "active" ? "success" : status === "on_leave" ? "warning" : "secondary"}
                size="small"
            >
                {status.replace("_", " ")}
            </Badge>
        )},
        { key: "projects", title: "Projects", sortable: true },
    ];

    const projectColumns = [
        { key: "name", title: "Project Name", sortable: true },
        { key: "status", title: "Status", render: (status) => (
            <Badge 
                variant={status === "completed" ? "success" : status === "in_progress" ? "warning" : "info"}
                size="small"
            >
                {status.replace("_", " ")}
            </Badge>
        )},
        { key: "progress", title: "Progress", render: (progress) => (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ 
                    width: "100px", 
                    height: "8px", 
                    backgroundColor: "#e9ecef", 
                    borderRadius: "4px", 
                    overflow: "hidden" 
                }}>
                    <div 
                        style={{ 
                            width: `${progress}%`, 
                            height: "100%", 
                            backgroundColor: progress === 100 ? "#28a745" : progress > 50 ? "#ffc107" : "#007bff" 
                        }}
                    />
                </div>
                <span style={{ fontSize: "0.875rem", color: "#666" }}>{progress}%</span>
            </div>
        )},
        { key: "deadline", title: "Deadline", sortable: true },
    ];

    const stats = [
        { label: "Team Members", value: "12", color: "#007bff" },
        { label: "Active Projects", value: "8", color: "#ffc107" },
        { label: "Completed", value: "15", color: "#28a745" },
        { label: "On Leave", value: "2", color: "#6c757d" },
    ];

    return (
        <div style={{ padding: "2rem" }}>
            <Card variant="elevated" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
                    <Avatar 
                        name={user?.username}
                        size="large"
                        backgroundColor="#ffc107"
                    />
                    <div>
                        <h1 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>Manager Dashboard</h1>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ color: "#666" }}>Welcome, {user?.username}</span>
                            <Badge variant="warning" size="medium">
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
                
                {/* Manager Actions */}
                <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ color: "#333", marginBottom: "1rem" }}>Quick Actions</h2>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <Button variant="primary">Create Project</Button>
                        <Button variant="secondary">Assign Tasks</Button>
                        <Button variant="success">Generate Report</Button>
                        <Button variant="warning">Team Meeting</Button>
                    </div>
                </div>
                
                {/* Team Members Table */}
                <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ color: "#333", marginBottom: "1rem" }}>Team Members</h2>
                    <Table 
                        columns={teamColumns}
                        data={teamMembers}
                        sortable={true}
                        selectable={true}
                        pagination={false}
                    />
                </div>
                
                {/* Projects Table */}
                <div>
                    <h2 style={{ color: "#333", marginBottom: "1rem" }}>Current Projects</h2>
                    <Table 
                        columns={projectColumns}
                        data={projects}
                        sortable={true}
                        selectable={true}
                        pagination={false}
                    />
                </div>
            </Card>
        </div>
    );
}

export default ManagerPage;