const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const SECRET = process.env.SECRET

// Middleware function to require authentication for protected routes
async function requireAuth(req, res, next) {
  // Extract the "Authorization" header from the request
  const { authorization } = req.headers

  // Check if the "Authorization" header is missing
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" })
  }

  // Extract the JWT token from the "Authorization" header (token should be in the format "Bearer <token>")
  const token = authorization.split(" ")[1]

  try {
    // Verify the JWT token using the SECRET to get the user's _id
    const { _id } = jwt.verify(token, SECRET)

    // Find the user with the provided _id from the decoded token and select only the "_id" field
    // This will attach the user object to the request, making it available in subsequent middleware or route handlers
    req.user = await User.findOne({ _id })

    // Move to the next middleware or route handler
    next()
  } catch (error) {
    console.log(error)
    // If there's an error in token verification, respond with a 401 status and an error message
    res.status(401).json({ error: error.message })
    // res.status(401).json({ error: "Request is not authorized" })
  }
}


module.exports = requireAuth