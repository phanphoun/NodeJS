import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Avatar from "../../ui/Avatar";
import Badge from "../../ui/Badge";
import Table from "../../ui/Table";

function ModeratorPage() {
    const { user } = useAuth();

    // Mock data for demonstration
    const reportedContent = [
        { id: 1, type: "Post", title: "Inappropriate content in forum", reporter: "user123", status: "pending", date: "2024-03-10" },
        { id: 2, type: "Comment", title: "Spam comment on course", reporter: "admin", status: "reviewed", date: "2024-03-09" },
        { id: 3, type: "User", title: "Harassment report", reporter: "user456", status: "pending", date: "2024-03-08" },
        { id: 4, type: "Post", title: "Off-topic discussion", reporter: "moderator2", status: "resolved", date: "2024-03-07" },
    ];

    const userReports = [
        { id: 1, username: "troublemaker", reports: 5, status: "suspended", lastReport: "2024-03-10" },
        { id: 2, username: "spammer99", reports: 12, status: "banned", lastReport: "2024-03-09" },
        { id: 3, username: "newuser", reports: 1, status: "warning", lastReport: "2024-03-08" },
    ];

    const contentColumns = [
        { key: "title", title: "Content", sortable: true },
        { key: "type", title: "Type", render: (type) => (
            <Badge variant="info" size="small">{type}</Badge>
        )},
        { key: "reporter", title: "Reported By", sortable: true },
        { key: "status", title: "Status", render: (status) => (
            <Badge 
                variant={
                    status === "pending" ? "warning" : 
                    status === "reviewed" ? "info" : 
                    status === "resolved" ? "success" : "secondary"
                }
                size="small"
            >
                {status}
            </Badge>
        )},
        { key: "date", title: "Date", sortable: true },
        { key: "actions", title: "Actions", render: (_, item) => (
            <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button variant="outline" size="small">Review</Button>
                <Button variant="success" size="small">Resolve</Button>
                <Button variant="danger" size="small">Remove</Button>
            </div>
        )},
    ];

    const userColumns = [
        { key: "username", title: "Username", sortable: true },
        { key: "reports", title: "Reports", sortable: true },
        { key: "status", title: "Status", render: (status) => (
            <Badge 
                variant={
                    status === "banned" ? "danger" : 
                    status === "suspended" ? "warning" : 
                    status === "warning" ? "info" : "success"
                }
                size="small"
            >
                {status}
            </Badge>
        )},
        { key: "lastReport", title: "Last Report", sortable: true },
        { key: "actions", title: "Actions", render: (_, user) => (
            <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button variant="outline" size="small">View Profile</Button>
                <Button variant="warning" size="small">Warn</Button>
                <Button variant="danger" size="small">Suspend</Button>
            </div>
        )},
    ];

    const stats = [
        { label: "Pending Reports", value: "23", color: "#ffc107" },
        { label: "Reviewed Today", value: "15", color: "#17a2b8" },
        { label: "Resolved This Week", value: "67", color: "#28a745" },
        { label: "Active Warnings", value: "8", color: "#dc3545" },
    ];

    return (
        <div style={{ padding: "2rem" }}>
            <Card variant="elevated" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2rem" }}>
                    <Avatar 
                        name={user?.username}
                        size="large"
                        backgroundColor="#17a2b8"
                    />
                    <div>
                        <h1 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>Moderator Dashboard</h1>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ color: "#666" }}>Welcome, {user?.username}</span>
                            <Badge variant="info" size="medium">
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
                
                {/* Moderator Actions */}
                <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ color: "#333", marginBottom: "1rem" }}>Moderation Actions</h2>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <Button variant="warning">Review Pending</Button>
                        <Button variant="info">View Reports</Button>
                        <Button variant="success">Resolve Content</Button>
                        <Button variant="danger">Emergency Actions</Button>
                    </div>
                </div>
                
                {/* Reported Content Table */}
                <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ color: "#333", marginBottom: "1rem" }}>Reported Content</h2>
                    <Table 
                        columns={contentColumns}
                        data={reportedContent}
                        sortable={true}
                        selectable={true}
                        pagination={false}
                    />
                </div>
                
                {/* User Reports Table */}
                <div>
                    <h2 style={{ color: "#333", marginBottom: "1rem" }}>User Reports</h2>
                    <Table 
                        columns={userColumns}
                        data={userReports}
                        sortable={true}
                        selectable={true}
                        pagination={false}
                    />
                </div>
            </Card>
        </div>
    );
}

export default ModeratorPage;
