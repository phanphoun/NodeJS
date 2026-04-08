import pool from "../../db.js";

const authModel = {
   //create users
    createUser: async (username, email, password, role = 'user') => {
        try {
            const [results] = await pool.execute(
                'INSERT INTO users (username, email, password, role) VALUES(?,?,?,?)',
                [username, email, password, role]
            );
            return results;
        } catch (error) {
            throw error;
        }
    },
    
    // find user by email
    findByEmail: async (email) => {
        try {
            const [results] = await pool.execute(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            return results[0] || null;
        } catch (error) {
            throw error;
        }
    },

};

export default authModel;