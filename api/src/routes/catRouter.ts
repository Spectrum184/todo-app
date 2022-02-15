import catCtrl from 'controllers/catCtrl';
import express from 'express';

const router = express.Router();

router.get('cat/:name', catCtrl.get);

router.post('cat', catCtrl.create);

export default router;
