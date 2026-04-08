import authModel from "../models/auth.model.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.utils.js"

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
            const token = generateToken(newUser)

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
            console.error('Registration error:', error);
            res.status(500).json({message: 'Internal server error'})
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body
            
            if (!email || !password) {
                return res.status(400).json({message: 'Email and password are required'})
            }

            const user = await authModel.findByEmail(email)
            if (!user) {
                return res.status(401).json({message: 'Invalid credentials'})
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(401).json({message: 'Invalid credentials'})
            }

            const token = generateToken(user)

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
            console.error('Login error:', error);
            res.status(500).json({message: 'Internal server error'})
        }
    },

    logout: async (req, res) => {
        try {
            res.status(200).json({message: 'Logout successful'})
        } catch (error) {
            console.error('Logout error:', error);
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
            console.error('Profile error:', error);
            res.status(500).json({message: 'Internal server error'})
        }
    }
}

export default AuthController