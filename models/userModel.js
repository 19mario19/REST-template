const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

// Define the schema for the user document
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

/**
 * Static method to sign up a new user with the provided email and password.
 * Performs input validation for email and password.
 * If the email is already in use, it throws an error.
 * Hashes the password and creates a new user document in the database.
*/
userSchema.statics.signup = async function (email, password) {
  // Input validation
  if (!email || !password) {
    throw Error("Both email and password fields must be filled")
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email format")
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password should be strong")
  }

  // Check if the email is already in use
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error("Email already in use")
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt() // default is 10
  const hash = await bcrypt.hash(password, salt)

  // Create a new user with the hashed password
  const user = await this.create({ email, password: hash })

  return user
}

/**
 * Static method for user login.
 * Validates the input email and finds the user document in the database.
 * If the user is found, it compares the provided password with the hashed password from the database.
 * If the password matches, it returns the user document, otherwise, it throws an error.
*/
userSchema.statics.login = async function (email, password) {
  // Input validation
  if (!email || !password) {
    throw Error("Both email and password fields must be filled")
  }

  // Find the user by email
  const user = await this.findOne({ email })
  if (!user) {
    throw Error("Email is incorrect. Login failed!")
  }

  const { password: hashedPasswordFromDb } = user

  // Compare the provided password with the hashed password stored in the database
  const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDb)
  if (passwordMatch) {
    return user
  } else {
    throw Error("Password is incorrect. Login failed!")
  }
}

// Create a model from the schema, which allows us to use methods to manipulate it
// e.g., User.findOne(), User.create({...data}), etc.
const User = model("User", userSchema)

module.exports = User
