import express from "express";

import { sigIn, signUp } from "../controller/user/userAuth.js";
import { adminSignIn, adminSignUp } from "../controller/admin/adminAuth.js";
import { addBook, deleteBook, getAllBooks, updateBook } from "../controller/books/addBook.js";
import { deleteUser, getAllUsers, updateUser } from "../controller/user/user.js";
import authenticateToken from "../middleware/authentication.js";
import { dashboardOvrView } from "../controller/admin/dashboard.js";
import { searchBook } from "../controller/books/searchBook.js";
import { allRequest, allReturnRequest, approveReq, myLibrary, noApproval, userAddLibrary, userLibrary } from "../controller/user/userlibrary.js";

const route = express.Router()

// route.post('/admin/signup',adminSignUp)
// route.post('/admin/signin',adminSignIn)

route.post('/signup',signUp)
route.post('/signin',sigIn)

route.get('/getbook',getAllBooks)
route.post('/addbook',authenticateToken,addBook)
route.post('/updatebook',authenticateToken,updateBook)
route.delete('/deletebook',authenticateToken,deleteBook)

route.get('/getdashboardcount',authenticateToken,dashboardOvrView)
route.get('/getusers',authenticateToken,getAllUsers)
route.post('/updateuser',authenticateToken,updateUser)
route.delete('/deleteuser',authenticateToken,deleteUser)
route.get('/search',searchBook)
route.post('/updatelibrary',authenticateToken,userAddLibrary)
route.post('/library',authenticateToken,userLibrary)
route.get('/mylibrary',authenticateToken,myLibrary)
route.get('/requests',authenticateToken,allRequest)
route.get('/returnreq',authenticateToken,allReturnRequest)
route.post('/approve',authenticateToken,approveReq)
route.post('/decline',authenticateToken,noApproval)

export default route