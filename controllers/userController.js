const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

function createToken(_id) {
  // payload must be non sensitive data like id(_id in mongodb)
  // secret must be kept only on the server in .env file
  // as an option, expire date can be set. The user would have to re-login.
  const token = jwt.sign({ _id }, SECRET, { expiresIn: "3d" })
  return token
}
// login user
async function loginUser(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup user
async function signupUser(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.signup(email, password)
    const token = createToken(user._id)
    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


module.exports = {
  loginUser,
  signupUser,
}
