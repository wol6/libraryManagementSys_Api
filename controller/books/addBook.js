import { bookModel } from "../../schema/books/books.js"

export const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.find().lean()

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
        const { bookname, author, imgurl } = req.body

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