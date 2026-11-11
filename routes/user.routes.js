import {Router} from 'express';
import { getUsers,getUser,updateUser, deleteUser } from '../controller/user.controller.js';
import authorization from '../errorhandler/user.errorhandler.js';

const router = Router();

router.get('/', authorization, getUsers);

router.get('/:id',authorization, getUser);

router.put('/:id',authorization, updateUser)

router.delete('/:id', authorization, deleteUser)

export default router;