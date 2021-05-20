import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { ValidateRequest } from '../middleware/validate-requests';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { PasswordValidator } from '../services/password';

const router = express.Router();

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .notEmpty()
    .withMessage('email must be valid'),
  body('password')
    .trim()
    .notEmpty()
  .withMessage('You must supply a password')
],
  ValidateRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = PasswordValidator.compare(existingUser.password, password);

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // create user JWT
    const userJwt = jwt.sign({
      id: existingUser.id, email: existingUser.email
    }
      , process.env.JWT_KEY!
    );

    // set cookie to userJwt
    req.session = {
      jwt: userJwt,
    }

  res.status(200).send({existingUser});
});

export { router as signinRouter };