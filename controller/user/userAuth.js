import { adminModel } from "../../schema/admin/admin.js";
import { userModel } from "../../schema/user/user.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
    try {

        const { userName, fullName, emailId, password, admin } = req.body.userObj

        if (admin) {
            const existingAdmin = await adminModel.find({ email: emailId }).lean()

            if (existingAdmin.length > 0) {
                return res.json({
                    email: existingAdmin.email,
                    msg: 'Email Already Exists',
                    success: false
                })
            }
            const hashPassword = await bcrypt.hash(password, 10)

            await adminModel.create({
                username: userName, fullname: fullName,
                email: emailId, password: hashPassword
            })

            return res.json({
                success: true,
                message: "Admin Registered Successfully",
            })

        }

        const existingUser = await userModel.find({ email: emailId }).lean()

        if (existingUser.length > 0) {
            return res.json({
                email: existingUser.email,
                msg: 'User Already Exists',
                success: false
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        await userModel.create({
            username: userName, fullname: fullName,
            email: emailId, password:hashPassword
        })

        return res.json({
            success: true,
            message: "Registered Successfully",
        })

    } catch (err) {
        console.log(err)
    }
}

export const sigIn = async (req, res) => {
    try {

        const { userName, password, admin } = req.body

        if (admin) {
            const adminer = await adminModel.findOne({ username: userName })

            if (!adminer) {
                return res.json({
                    msg: 'Invalid credentials',
                    success: false
                })
            }
            const isValidPassword = await bcrypt.compare(password,adminer.password)
            if (!isValidPassword) {
                return res.status(401).json({success:false, message: 'Invalid credentials' });
            }

            const jwtToken = generateJwtToken(adminer._id)
            adminer.token = jwtToken
            await adminer.save()

            return res.json({
                msg: 'success',
                token: jwtToken,
                success: true
            })
        }

        const user = await userModel.findOne({ username: userName })

        if (!user) {
            return res.json({
                msg: 'Invalid credentials',
                success: false
            })
        }
        const isValidPassword = await bcrypt.compare(password,user.password)
        if (!isValidPassword) {
            return res.status(401).json({success:false, message: 'Invalid credentials' });
        }
        const jwtToken = generateJwtToken(user._id)
        user.token = jwtToken
        await user.save()

        return res.json({
            msg: 'success',
            token: jwtToken,
            success: true
        })

    } catch (err) {
        console.log(err)
    }
}

export function generateJwtToken(userId) {
    try {
        let jwttoken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return jwttoken
    }
    catch (e) {
        console.log(e)
    }
}