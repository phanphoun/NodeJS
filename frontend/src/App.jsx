
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navigation";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicPage from "./components/page/PublicPage";
import UserPage from "./components/page/user/UserPage";
import AdminPage from "./components/page/admin/AdminPage";
import ManagerPage from "./components/page/manager/ManagerPage";
import ModeratorPage from "./components/page/moderator/ModeratorPage";
import Profile from "./components/Profile";
import NotFound from "./utils/NotFound";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navigation />
                    <Routes>
                        <Route index element={<PublicPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route 
                            path="/dashboard" 
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/user" 
                            element={
                                <ProtectedRoute requiredRole="user">
                                    <UserPage />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/admin" 
                            element={
                                <ProtectedRoute requiredRole="admin">
                                    <AdminPage />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/manager" 
                            element={
                                <ProtectedRoute requiredRole="manager">
                                    <ManagerPage />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/moderator" 
                            element={
                                <ProtectedRoute requiredRole="moderator">
                                    <ModeratorPage />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/profile" 
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;