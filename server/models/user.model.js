import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  profilePicture: {
    type: String,
    default: 'https://freeiconshop.com/wp-content/uploads/edd/chef-flat.png'
  },
  isGoogleUser: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
