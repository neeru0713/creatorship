const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");


var SALT_WORK_FACTOR = 10;

async function createUser(userBody) {
  try {
    let userExists = await User.findOne({ email: userBody.email });
    if (userExists) {
      throw new ApiError(httpStatus.CONFLICT, "Email already taken");
    } else {
      const newUser = new User(userBody);
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      const result = await newUser.save();
      return result;
    }
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
}

async function matchPassword(clientPassword, storedPassword) {
  const isMatchPassword = await bcrypt.compare(clientPassword, storedPassword);
  return isMatchPassword;
}

async function loginUser(username, password) {
  try {
    let user = await User.findOne({ username: username });
    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist");
    }
    const isMatchPassword = await matchPassword(password, user.password);
    
    if (!isMatchPassword) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Password doesn't match");
    } else {
      return user;
    }
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
}

module.exports = {
  createUser,
  loginUser,
};