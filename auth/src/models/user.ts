import mongoose from 'mongoose';

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

userSchema.statics.buildUser = (attrs: UserAttributes) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };