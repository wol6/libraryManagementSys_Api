import { userModel } from "../../schema/user/user.js"

export const getAllUsers = async (req, res) => {
    try {
        let users = await userModel.find().lean()

        if (!users) {
            return res.json({
                success: false,
                message: "No Users",
            })
        }

        users = users.map((elm) => {
            delete elm.password
            return elm
        })

        return res.json({
            success: true,
            message: "All Users",
            users
        })
    } catch (e) {
        console.log(e)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userName, fullName, emailId } = req.body.userObj

        if (!userName) return res.json({ success: false, msg: 'User Name required' })

      const t=  await userModel.updateOne({username :userName }, { username:userName, fullname:fullName, email:emailId })

        return res.json({
            success: true,
            msg: 'Updated'
        })

    } catch (e) {
        console.log(e)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) return res.json({ success: false, msg: 'Id required' })

        await userModel.findByIdAndDelete({ _id: id })

        return res.json({
            success: true,
            msg: 'Deleted'
        })

    } catch (e) {
        console.log(e)
    }
}