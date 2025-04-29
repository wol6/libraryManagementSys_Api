import { bookModel } from "../../schema/books/books.js"
import { userModel } from "../../schema/user/user.js"


export const userLibrary = async(req,res)=>{
    try{
        const {userId,bookId} = req.body
        const user = await userModel.findById(userId)
        const book = await bookModel.findById(bookId)

        console.log(user,book)
    }catch(err){
        console.log(err)
    }
}