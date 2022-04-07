import UserController from '../controllers/userCtrl';
import express from 'express';

const router = express.Router();

router.post('/user', UserController.createUser);

router.post('/user/login', UserController.UserLogin);

router.post('/user/logout', UserController.UserLogout);

router.get('/user/:username', UserController.userGet);

router.get('/user/role/:role', UserController.userGetAll);

router.delete('/user/:id', UserController.userDelete);

router.patch('/user/edit/:id', UserController.userUpdate);

export default router;
