import jwt from "jsonwebtoken";
import errorHandler from "../utils/error.js";
import UserModel from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log(req.headers);

  console.log(cookies);

  if (!cookies) {
    return next(errorHandler(404, "Cookie not found"));
  }

  const token = cookies.split("token=")[1];

  console.log(token);

  if (!token) {
    return next(errorHandler(401, "Token not provided"));
  }

  try {
    const verifiedTokenUser = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(verifiedTokenUser.userId).select(
      "-password"
    );

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("error in verification of token", error);
    next(error);
  }
};

export default verifyToken;
