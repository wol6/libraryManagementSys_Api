import { userModel } from "../../schema/user/user.js"

export const getAllUsers = async(req,res)=>{
try{
  const users = await userModel.find().lean()

        if (!users) {
            return res.json({
                success: false,
                message: "No Users",
            })
        }

        return res.json({
            success: true,
            message: "All Users",
            users
        })
}catch(e){
    console.log(e)
}
}