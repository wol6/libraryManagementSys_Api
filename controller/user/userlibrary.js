import { bookModel } from "../../schema/books/books.js"
import { libTransationModel } from "../../schema/books/libtransaction.js"
import { userModel } from "../../schema/user/user.js"


export const userAddLibrary = async (req, res) => {
    try {
        const { userId, bookId } = req.body

        if (!userId || !bookId) {
            return res.status(400).json({ message: "userId and bookId are required" });
        }

        // const user = await userModel.findById(userId)
        await bookModel.updateOne({ _id: bookId }, { availabilityStatus: false })

        await libTransationModel.updateOne({ userdetails: userId, bookdetails: bookId }, {
            $set: { userdetails: userId, bookdetails: bookId }
        }, { upsert: true })

        return res.json({
            success: true,
            message: "Add To Request",
        })

    } catch (err) {
        console.log(err)
    }
}

export const userLibrary = async (req, res) => {
    try {
        const { userId, bookId } = req.body

        const mylibrary = await libTransationModel.find({ userdetails: userId })
        console.log(mylibrary)

        return res.json({
            success: true,
            message: "",
            mylibrary
        })

    } catch (err) {
        console.log(err)
    }
}

export const allRequest = async (req, res) => {
    try {

        const allRequest = await libTransationModel
            .find({}).lean()
            .populate('userdetails')
            .populate('bookdetails')

        return res.json({
            success: true,
            message: "",
            allRequest
        })
    } catch (e) {
        console.log(e)
    }
}