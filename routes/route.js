import express from "express";

import { sigIn, signUp } from "../controller/user/userAuth.js";
import { adminSignIn, adminSignUp } from "../controller/admin/adminAuth.js";
import { addBook } from "../controller/books/addBook.js";

const route = express.Router()

route.post('/admin/signup',adminSignUp)
route.post('/admin/signin',adminSignIn)

route.post('/signup',signUp)
route.post('/signin',sigIn)

route.post('/addbook',addBook)

export default route