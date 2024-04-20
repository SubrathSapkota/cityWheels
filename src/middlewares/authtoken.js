// Exteranal Import
import jwt from "jsonwebtoken"
import createError from "http-errors"

// Internal Import
import { User } from "../models/user.model"
import JWT_TOKEN from "../models/jwttoken.model"

const authenticateToken = (req, res, next) => {
  if (!req.headers["authorization"]) return next(createError.Unauthorized())
  const accessToken = req.headers["authorization"].split(" ")[1]
  jwt.verify(accessToken, "secret", async (err, payload) => {
    if (err) {
      const message =
        err.name == "JsonWebTokenError" ? "Unauthorized" : err.message
      return next(createError.Unauthorized(message))
    }

    let checkToken = await JWT_TOKEN.findOne({
      uuid: payload.uuid,
      softDelete: false,
    })

    if (!checkToken) {
      return next(createError.Unauthorized())
    }

    let findUser = await User.findOne({
      username: checkToken.username,
    })

    if (!findUser) {
      return next(createError.Unauthorized())
    }

    req.user = findUser
    req.user.uuid = payload.uuid
    return next()
  })
}
export default authenticateToken
