import express from "express";

import { sigIn, signUp } from "../controller/user/userAuth.js";
import { adminSignIn, adminSignUp } from "../controller/admin/adminAuth.js";
import { addBook, getAllBooks } from "../controller/books/addBook.js";
import { getAllUsers } from "../controller/user/user.js";
import authenticateToken from "../middleware/authentication.js";

const route = express.Router()

route.post('/admin/signup',adminSignUp)
route.post('/admin/signin',adminSignIn)

route.post('/signup',signUp)
route.post('/signin',sigIn)

route.get('/getbook',getAllBooks)
route.post('/addbook',authenticateToken,addBook)

route.get('/getusers',getAllUsers)

export default route