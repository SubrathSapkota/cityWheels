import bcrypt from "bcrypt"

//yo bhaneko chai hashing with plain string. 
function comparePasswordHash(supplied, hashedPassword) {
  return bcrypt.compareSync(supplied, hashedPassword)
}

// create a hash from plain string
function hashPassword(supplied) {
  return bcrypt.hashSync(supplied, bcrypt.genSaltSync(10))
}

export { comparePasswordHash, hashPassword }