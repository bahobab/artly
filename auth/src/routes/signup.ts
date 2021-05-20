import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();
router.use(express.json());

router.post('/api/users/signup',
  [body('email').isEmail()
    .withMessage('Email must be valid'),
    body('password')
      .trim().isLength({ min: 4, max: 20 })
      .withMessage('Password length must be between 4 and 20 characters')
  ],
  async (req: Request, res: Response) => {  
  
  const errors = validationResult(req);
    // console.log(req.body);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email already in use');
    }

    const user = User.buildUser({ email, password });
    await user.save();
    
    // create user JWT
    const userJwt = jwt.sign({
      id: user?.id, email: user?.email
    }
      , process.env.JWT_KEY!
    );

    // set cookie to userJwt
    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(user);
});

export { router as signupRouter };