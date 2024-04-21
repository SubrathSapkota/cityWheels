import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import createError from "../utils/createErrors.js";
import { comparePasswordHash, hashPassword } from "../utils/hash.utils.js";
import { v4 as uuidv4 } from "uuid";
import { signAccessToken } from "../utils/jwt.utils.js";
import JWT_TOKEN from "../models/jwttoken.model.js";


export const registerUser = async function (req, res, next) {
  try {
    const userexists = await User.findOne({
      email: req.body.email,
      username: req.body.username,
    });

    if (userexists) {
      createError(200, "User already exist");
    }

    const passwordHash = hashPassword(req.body.password);

    const user = await User.create({
      ...req.body,
      password: passwordHash,
    });

    return res.json({
      success: true,
      message: "User registered Succesfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async function (req, res, next) {
  try {

    //check if username exists or not
    const findUser = await User.findOne({
      email: req.body.email,
    });

    if (!findUser) throw createError(200, "User not registered !");

    const validPassword = comparePasswordHash(
      req.body.password,
      findUser.password
    );

    if (!validPassword) throw createError(200, "Username/password not valid!");

    let data = {
      username: findUser.username,
      id: findUser._id,
    };

    data.uuid = uuidv4().substring(0, 6);

    await JWT_TOKEN.create({
      username: findUser.username,
      uuid: data.uuid,
    });

    // generate access token
    const accessToken = await signAccessToken(data);

     res.cookie('accessToken', accessToken, { maxAge: 900000 });

    // send response
    return res.status(200).json({
      success: true,
      token: accessToken,
      user: findUser,
      message: "User login Succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      throw createError(404, "No users found");
    }

    res.status(200).json({
      success: true,
      users: users,
      message: "All users retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};
