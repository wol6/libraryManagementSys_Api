import express from "express";

import { sigIn, signUp } from "../controller/user/userAuth.js";
import { adminSignIn, adminSignUp } from "../controller/admin/adminAuth.js";

const route = express.Router()

route.post('/admin/signup',adminSignUp)
route.post('/admin/signin',adminSignIn)

route.post('/signup',signUp)
route.post('/signin',sigIn)

export default route