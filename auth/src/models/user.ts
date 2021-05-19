import mongoose from 'mongoose';

import { Password } from '../services/password';

interface UserAttributes {
  email: string;
  password: string;
}

// interface that discribes user model
interface UserModel extends mongoose.Model<UserDoc> {
  buildUser(attrs: UserAttributes): UserDoc;
}

// interface that describes the properties of a user document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  // createdAt: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hash = await Password.toHash(this.get('password'));
    this.set('password', hash);
  }

  done();
});

userSchema.statics.buildUser = (attrs: UserAttributes) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };