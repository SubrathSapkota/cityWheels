import JWT from "jsonwebtoken"
import createError from "./createErrors.js"

export const signAccessToken = (data) => {
  return new Promise((resolve, reject) => {
    const username = data.username
    const secret = "secret"
    // expiresIn: '2 days'
    const options = {
      expiresIn: "7 days",
      issuer: "subrat.com.np", // issued by,
      audience: username,
    }
    JWT.sign(data, secret, options, (err, token) => {
      if (err) reject(createError.InternalServerError())
      // expire token after 2 days
      resolve(token)
    })
  })
}