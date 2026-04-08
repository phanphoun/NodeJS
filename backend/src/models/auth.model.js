

import connection from "../../db.js";

const authModel = {
   //create users
    createUser: (username, email, password, role = 'user') => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users (username, email, password, role) VALUES(?,?,?,?)', [username, email, password, role], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
        })
    },
    
    // find user by email
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(results[0] || null)
                }
            })
        })
    },

};

export default authModel;