import mongoose from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

const { isEmail } = validator;
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profileImage: String,
    coverImage: String,
    livesIn: String,
    worksAt: String,
    about: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
