import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"




const cookieOptions = {
    httpOnly: true,     // Prevent client-side javascrit from accessingt thcookie
    secure: process.env.APP_ENV === "production",  // Ensure te cookie is only sent over HTTPS in production
    sameSite: process.env.APP_ENV === "production" ? "none" : "strict"  // contorls when cookies are sent "none" allows cross -site in production, "serict" black
}



// USER RESGISTER ROUTE

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // checking if user is alrady exist or not
        const exists = await User.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "user alreaedy exists" })
        }

        // validate password and checking strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" })
        }
        if (!password || password.length < 8) {
            return res.json({ success: false, message: "please enter a strong password" })
        }
        // Hash user password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        console.log(req.body)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000  // cookie expiration time
        })
        return res.json({ success: true, user: { email: user.email, name: user.name } })
    } catch (error) {
        console.log("error.message")
        res.json({ success: false, message: error.message })
    }
}

// USER LOGIN ROUTE 

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user doesn't exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "user doesn't exists" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("token", token, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, user: { email: user.email, name: user.name } })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

//    CEHCK AUTH

export const isAuth = async (req, res) => {
    try {
        const { userId } = req
        const user = await User.findById(userId).select("-password")
        return res.json({ success: true, user })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


// LOGOUT USER

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", cookieOptions)
        return res.json({ success: true, message: "sucessfully Logged out" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
