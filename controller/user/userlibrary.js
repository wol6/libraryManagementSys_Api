import dayjs from "dayjs"
import { bookModel } from "../../schema/books/books.js"
import { libTransationModel } from "../../schema/books/libtransaction.js"
import { userModel } from "../../schema/user/user.js"


export const userAddLibrary = async (req, res) => {
    try {
        const { userId, bookId } = req.body

        if (!userId || !bookId) {
            return res.status(400).json({ message: "userId and bookId are required" });
        }

        await libTransationModel.updateOne({ userdetails: userId, bookdetails: bookId }, {
            $set: { userdetails: userId, bookdetails: bookId }
        }, { upsert: true })

        await bookModel.updateOne({ _id: bookId }, { availabilityStatus: false })

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

export const myLibrary = async (req, res) => {
    try {
        const userid = req.query.userId
        const mylibrary = await libTransationModel.find({ userdetails: userid })
            .populate('bookdetails')

        return res.json({
            success: true,
            message: "",
            mylibrary
        })

    } catch (e) {
        console.log(e)
    }
}

export const allRequest = async (req, res) => {
    try {

        const allRequest = await libTransationModel
            .find({ isapproved: false }).lean()
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

export const allReturnRequest = async (req, res) => {
    try {

        const dueDate = req.query.dueDate

        if (dueDate) {
            //2025-05-11T00:00:00.000+00:00
            const dt = dayjs().startOf('day').format('YYYY-MM-DD')
            const allRequest = await libTransationModel.
                find({ duedate: dt }).lean().populate('userdetails').populate('bookdetails')
            return res.json({
                success: true,
                message: "",
                allRequest
            })
        }

        const allRequest = await libTransationModel
            .find({ isapproved: true }).lean()
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

export const approveReq = async (req, res) => {
    try {
        const { id } = req.body

        const duedate = dayjs().add(7, 'days').format('YYYY-MM-DD')
        await libTransationModel.updateOne({ _id: id }, { isapproved: true, duedate })

        return res.json({
            success: true,
            msg: 'Updated'
        })
    } catch (e) {
        console.log(e)
    }
}

export const noApproval = async (req, res) => {
    try {
        const { id } = req.body

        const details = await libTransationModel.findOne({ _id: id }).lean()
        await bookModel.updateOne({ _id: details.bookdetails }, { availabilityStatus: true })
        await libTransationModel.findByIdAndDelete({ _id: id })

        return res.json({
            success: true,
            msg: 'Deleted'
        })
    } catch (e) {
        console.log(e)
    }
}