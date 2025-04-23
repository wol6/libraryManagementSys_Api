import Joi from "joi"
import { bookModel } from "../../schema/books/books.js"

export const getAllBooks = async (req, res) => {
    try {
        let filterObj = {}
        const page =parseInt( req.query.page) || 0
        const booksPerPage = 3
        const books = await bookModel.find(filterObj).lean().skip(page*booksPerPage).limit(booksPerPage)

        if (!books) {
            return res.json({
                success: false,
                message: "No Books",
            })
        }

        return res.json({
            success: true,
            message: "All Books",
            books
        })
    } catch (e) {
        console.log(e)
    }
}


export const addBook = async (req, res) => {
    try {
        const schema = Joi.object({
            bookname: Joi.string().required(),
            author: Joi.string().required(),
            imgurl: Joi.string().required()
        })
        const { error, value } = schema.validate(req.body)
        console.log(error?.message)
        if (error) {
            return res.json({
                success: false,
                msg: error.message
            })
        }
        const { bookname, author, imgurl } = value || {}

        const existingBook = await bookModel.find({ bookname }).lean()

        if (existingBook.length > 0) {
            return res.json({
                bookname: existingBook.bookname,
                msg: 'Book Already Exists',
                success: false
            })
        }

        await bookModel.create({ bookname, author, imgurl })

        return res.json({
            success: true,
            message: "Book Added Successfully",
        })
    } catch (err) {
        console.log(err)
    }
}