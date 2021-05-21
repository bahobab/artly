import mongoose from 'mongoose';

import { app } from './app';

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('connected to mongodb')
  } catch (error) {
    console.error(error)
  }
  
  app.listen(3000, () => {
    console.log('AUTH: Server listening on port 3000!!');
  });
};

startServer();