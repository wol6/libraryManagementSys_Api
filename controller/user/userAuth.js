import { userModel } from "../../schema/user/user.js";


export const signUp = async (req, res) => {
    try {

        const { username, fullname, email, password } = req.body

        const existingUser = await userModel.find({ email }).lean()

        if (existingUser.length > 0) {
            return res.json({
                email: existingUser.email,
                msg: 'User Already Exists',
                success: false
            })
        }

        await userModel.create({ username, fullname, email, password })

        return res.json({
            success: true,
            message: "Registered Successfully",
        })

    } catch (err) {
        console.log(err)
    }
}

export const sigIn = async (req,res)=>{
    try{

        const {username,password} = req.body

        const user = await userModel.findOne({username,password}).lean()

        if(!user){
            return res.json({
                msg: 'User Not Found',
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