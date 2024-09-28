import UserModel from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const isUserExist = await UserModel.findOne({ email });

    if (!username || !email || !password) {
      return next(errorHandler(400, "please enter all feilds"));
    }

    if (isUserExist) {
      return next(errorHandler(409, "User already exists"));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Registration Successful",
      user: newUser,
    });
  } catch (error) {
    console.log("error in user registration", error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = await req.body;

    if (!email || !password) {
      return next(errorHandler(400, "please enter all feilds"));
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid password"));
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    );

    const expiryTime = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    res.cookie("token", token, {
      httpOnly: true,
      expires: expiryTime,
      sameSite: "None",
    });

    res.status(200).json({
      success: true,
      message: "login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log("error in user login", error);
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    // console.log(req.user);

    res.status(200).json({ success: true, message: "logout successful" });
  } catch (error) {
    console.log("error in user logout", error);
    next(error);
  }
};
