import { userModel } from "../../schema/user/user.js";


export const signUp = async (req, res) => {
    try {

        const { userName, fullName, emailId, password } = req.body.userObj

        const existingUser = await userModel.find({email: emailId }).lean()

        if (existingUser.length > 0) {
            return res.json({
                email: existingUser.email,
                msg: 'User Already Exists',
                success: false
            })
        }

        await userModel.create({
            username: userName, fullname: fullName,
            email: emailId, password
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

        const { userName, password } = req.body

        const user = await userModel.findOne({ username:userName, password }).lean()

        if (!user) {
            return res.json({
                msg: 'User Not Found',
                success: false
            })
        }

        return res.json({
            msg: 'success',
            success: true
        })

    } catch (err) {
        console.log(err)
    }
}