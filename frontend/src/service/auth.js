
import { API } from "./api";

export const auth = {
    login: async (email, password) => {
        const response = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    },
    register: async (username, email, password, role = "user") => {
        const response = await fetch(`${API}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, role }),
        });
        return response.json();
    },
    logout: async () => {
        const response = await fetch(`${API}/logout`, {
            method: "POST",
        });
        return response.json();
    },
    getProfile: async () => {
        const response = await fetch(`${API}/profile`, {
            method: "GET",
        });
        return response.json();
    },
};

export default auth;