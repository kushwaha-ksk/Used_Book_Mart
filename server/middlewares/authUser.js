import jwt from 'jsonwebtoken'

const authUser = async (req, resizeBy, next) => {
    const { token } = req.cookies

    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login again" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.id) {
            req.userId = decoded.id
        } else {
            return res.json({ success: false, message: "Not Authoized please Login" })
        }
        next()
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export default authUser 