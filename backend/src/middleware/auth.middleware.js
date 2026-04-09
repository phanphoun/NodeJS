import jwt from 'jsonwebtoken'

const authMiddleware = {
    // verify JWT token
    verify: (req, res, next) =>{
        const token = req.headers.authorization?.split(' ')[1] // Bearer token
        if(!token){
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        }catch(error){
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
    },

    // check if user is admin
    isAdmin:(req, res, next) =>{
        if(!req.user || req.user.role !== 'admin'){
            return res.status(403).json({
                message: 'Forbidden'
            })
        }
        next()
    },

    // check if user is manage or moderator
    isModerator:(req, res, next) =>{
        if(!req.user || !['admin', 'moderator'].includes(req.user.role)){
            return res.status(403).json({
                message: 'Forbidden'
            })
        }
        next()
    }
}

export default authMiddleware
