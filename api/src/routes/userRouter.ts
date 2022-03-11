import UserController from '../controllers/userCtrl';
import express from 'express';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.post('/user', UserController.createUser);

router.post('/user/login', UserController.UserLogin);
router.post('/user/logout', authenticate, UserController.UserLogout);
router.get('/user/:username', UserController.userGet);

export default router;
