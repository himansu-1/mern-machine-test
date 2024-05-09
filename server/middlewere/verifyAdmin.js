const jwt = require('jsonwebtoken')

const varifyAdmin = async (req, res, next)=>{
    let success = false
    const token = req.header("auth-token")
    try {
        if (!token) {
            return res.status(401).json({success: success, result: "Invalid Token ok", token:token})
        }

        const data = jwt.verify(token,process.env.JWT_SIGN)

        req.name = data.name
        req.id = data.id
        // console.log(data)
        // req.admin = data
        next()
    } catch (error) {
        return res.status(401).json({error: error})
    }
}

module.exports = varifyAdmin