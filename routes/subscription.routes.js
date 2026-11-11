import { Router } from "express";
import authorization from "../errorhandler/user.errorhandler.js";
import {createSubscription,getSubscriptions,getSubscription,updateSubscription ,deleteSubscription} from "../controller/subscription.controller.js";

const router = Router();

router.get('/',authorization, getSubscriptions);

router.get('/:id',authorization, getSubscription)

router.post('/', authorization, createSubscription)

router.put('/:id', authorization , updateSubscription)

router.delete('/:id', authorization ,deleteSubscription)

export default router;