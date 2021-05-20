import express from 'express';
import jwt from 'jsonwebtoken';

import { CurrentUser } from '../middleware/current-user';

const router = express.Router();

router.get('/api/users/currentuser', CurrentUser, (req, res) => {
  
  res.send({req: req.currentUser || null});
  
});

export { router as currentUserRouter };