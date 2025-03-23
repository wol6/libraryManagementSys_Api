import { adminModel } from "../../schema/admin/admin.js";


export const adminSignUp = async (req, res) => {
    try {

        const { username, fullname, email, password } = req.body

        const existingAdmin = await adminModel.find({ email }).lean()

        if (existingAdmin.length > 0) {
            return res.json({
                email: existingUser.email,
                msg: 'Admin Already Exists',
                success: false
            })
        }

        await userModel.create({ username, fullname, email, password })

        return res.json({
            success: true,
            message: "Admin Registered Successfully",
        })

    } catch (err) {
        console.log(err)
    }
}

export const adminSignIn = async (req,res)=>{
    try{

        const {username,password} = req.body

        const user = await adminModel.findOne({username,password}).lean()

        if(!user){
            return res.json({
                msg: 'Admin Not Found',
                success: false
            })
        }

        return res.json({
            user,
            msg: 'success',
            success: true
        })

    }catch(err){
        console.log(err)
    }
}