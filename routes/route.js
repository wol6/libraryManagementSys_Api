import express from "express";

import { sigIn, signUp } from "../controller/user/userAuth.js";
import { adminSignIn, adminSignUp } from "../controller/admin/adminAuth.js";
import { addBook, getAllBooks } from "../controller/books/addBook.js";
import { getAllUsers } from "../controller/user/user.js";
import authenticateToken from "../middleware/authentication.js";
import { dashboardOvrView } from "../controller/admin/dashboard.js";
import { searchBook } from "../controller/books/searchBook.js";
import { allRequest, approveReq, userAddLibrary, userLibrary } from "../controller/user/userlibrary.js";

const route = express.Router()

// route.post('/admin/signup',adminSignUp)
// route.post('/admin/signin',adminSignIn)

route.post('/signup',signUp)
route.post('/signin',sigIn)

route.get('/getbook',getAllBooks)
route.post('/addbook',authenticateToken,addBook)

route.get('/getdashboardcount',authenticateToken,dashboardOvrView)
route.get('/getusers',authenticateToken,getAllUsers)
route.get('/search',searchBook)
route.post('/updatelibrary',authenticateToken,userAddLibrary)
route.post('/mylibrary',authenticateToken,userLibrary)
route.get('/requests',authenticateToken,allRequest)
route.post('/approve',authenticateToken,approveReq)

export default route