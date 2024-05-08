import mongoose from 'mongoose';
const { Schema, model } = mongoose;
// Define the email registration schema
const userRegistrationSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  otp: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        // Email validation logic
        // You can use a library like validator.js for more robust email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profileId:{
    type: String,
    default:null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  history:{
    type:Array,
    default:[]
  }
});

// Create the EmailRegistration model using the schema
export default model('User', userRegistrationSchema);