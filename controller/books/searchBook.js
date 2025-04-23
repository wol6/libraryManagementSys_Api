import { bookModel } from "../../schema/books/books.js"


export const searchBook = async (req,res)=>{
    try{
        const query = req.query.name
        const searchResult =  await bookModel.find({bookname:{$regex:query,$options:'i'}})
        return res.json({
            success : true,
            searchResult
        })
    }catch(e){
        console.log(e)
    }
}