const authService = require("../services/authService");
const tokenService = require("../services/tokenService");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const register = catchAsync(async (req, res) => {
  let newUser = await authService.createUser(req.body);
  const token = await tokenService.generateAuthTokens(newUser);
 
  let resObj = {
    user: newUser,
    token,
    message: "User registeration successful",
  };

  res.status(httpStatus.CREATED).json(resObj);
});

const login = catchAsync(async (req, res) => {
  let user = await authService.loginUser(req.body.username, req.body.password);

  const token = await tokenService.generateAuthTokens(user);
  let resObj = {
    user: user,
    token,
    message: "User login successful",
  };
  res.status(httpStatus.OK).json(resObj);
});

module.exports = {
  register,
  login,
};