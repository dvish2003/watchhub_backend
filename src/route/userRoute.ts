import express ,{Router} from 'express'
import { authenticate } from '../middleware/authenticate';
import { getAllUsers, getUserByEmail, login, saveUser } from '../controller/userController';

const router = Router();

router.post('/register',saveUser);
router.post('/login',login);
router.post('/getAllUser',authenticate,getAllUsers);
router.post('/getUserByEmail',authenticate,getUserByEmail);

export default router;