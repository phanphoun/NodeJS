
import authModel from "../models/auth.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const AuthController = {
    register: async (req, res) => {
        try{
            const {username, email, password, role = 'user'} = req.body
            // validate input
            if (!username || !email || !password) {
                return res.status(400).json({message: 'Username, email and password are required'})
            }

            // validate role

            const validRoles = ['user', 'admin', 'moderator']
            if (!validRoles.includes(role)) {
                return res.status(400).json(
                    {
                        message: 'Invalid role. Must be user, admin or moderator'
                    }
                )
            }

            //check if user already exists
            const existingUser = await authModel.findByEmail(email)
            if (existingUser) {
                return res.status(400).json(
                    {
                        message: "User already exists"
                    }
                )
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10)

            // create user
            const user = await authModel.createUser(
                username,
                email,
                hashedPassword,
                role
            )
            
            // Get created user details
            const newUser = await authModel.findByEmail(email)

            // Create JWT token
            const token = jwt.sign(
                { 
                    id: newUser.id, 
                    email: newUser.email, 
                    username: newUser.username,
                    role: newUser.role 
                },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            )

            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                }
            })

        }catch(error){
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    },

    login: async (req, res) => {
        try {
            console.log('Login attempt:', req.body);
            const {email, password} = req.body
            
            if (!email || !password) {
                return res.status(400).json({message: 'Email and password are required'})
            }

            console.log('Finding user by email:', email);
            const user = await authModel.findByEmail(email)
            if (!user) {
                return res.status(401).json({message: 'Invalid credentials'})
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(401).json({message: 'Invalid credentials'})
            }

            const token = jwt.sign(
                { 
                    id: user.id, 
                    email: user.email, 
                    username: user.username,
                    role: user.role 
                },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            )

            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    },

    logout: async (req, res) => {
        try {
            res.status(200).json({message: 'Logout successful'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = req.user
            res.status(200).json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    }
}

export default AuthController