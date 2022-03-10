import catCtrl from '../controllers/catCtrl';
import express from 'express';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/cat/:name', authenticate, catCtrl.get);

router.post('/cat', catCtrl.create);

router.patch('/cat/:id', catCtrl.update);

router.delete('/cat/:id', catCtrl.delete);

export default router;