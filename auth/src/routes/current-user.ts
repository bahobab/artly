import express from 'express';

const router = express.Router();

router.get('/api/users/current-user', (req, res) => {
  const { username, password } = req.body;
  res.send('Current User');
});

export { router as currentUserRouter };