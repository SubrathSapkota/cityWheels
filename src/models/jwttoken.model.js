import mongoose from "mongoose"
const Schema = mongoose.Schema

let jwtToken = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    softDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

jwtToken.methods.toJSON = function () {
  let jwtToken = this.toObject()
  delete jwtToken.createdAt
  delete jwtToken.updatedAt
  delete jwtToken.__v
  return jwtToken
}

const JWT_TOKEN = mongoose.model("jwt_token", jwtToken)

export default JWT_TOKEN
