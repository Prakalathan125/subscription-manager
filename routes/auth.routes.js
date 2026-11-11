import { Router } from "express";
import {signup, signin} from '../controller/auth.controller.js'

const router = Router();

router.post('/signup', signup);

router.post('/signin',signin)

router.post('/signout',(req,res) => res.send("User signout"))

export default router;