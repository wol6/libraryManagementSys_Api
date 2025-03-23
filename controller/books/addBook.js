import { bookModel } from "../../schema/books/books.js"


export const addBook = async (req, res) => {
    try {
        const { bookname, author, availabilityStatus } = req.body

        const existingBook = await bookModel.find({ bookname }).lean()

        if (existingBook.length > 0) {
            return res.json({
                bookname: existingBook.bookname,
                msg: 'Book Already Exists',
                success: false
            })
        }

        await bookModel.create({bookname,author,availabilityStatus })

        return res.json({
            success: true,
            message: "Book Added Successfully",
        })
    } catch (err) {
        console.log(err)
    }
}