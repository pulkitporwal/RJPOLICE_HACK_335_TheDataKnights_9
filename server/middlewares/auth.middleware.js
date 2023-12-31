import JWT, { decode } from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  }

  const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const userFetchedWithTokenData = await User.findById(decodedToken._id).select(
    "-password -refreshToken"
  );

  if (!userFetchedWithTokenData) {
    return res.status(400).json({
      success: true,
      message: "Invalid Token Access",
    });
  }

  req.user = userFetchedWithTokenData;

  next();
};

export { verifyJWT };
