import express from "express";

import { sigIn, signUp } from "../controller/user/userAuth.js";

const route = express.Router()

route.post('/signup',signUp)
route.post('/signin',sigIn)
export default route