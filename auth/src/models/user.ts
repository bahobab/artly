import mongoose from 'mongoose';

import { PasswordValidator } from '../services/password';

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
},
  {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    }
  }
}
);

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hash = await PasswordValidator.toHash(this.get('password'));
    this.set('password', hash);
  }

  done();
});

userSchema.statics.buildUser = (attrs: UserAttributes) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };