const express = require("express")
const {
  getAll,
  getOne,
  postOne,
  deleteOne,
  updateOne,
} = require("../controllers/controllers")

const router = express.Router()

// Import middleware for requiring authentication
const requireAuth = require("../middleware/requireAuth")

// Apply the requireAuth middleware to protect all routes below
router.use(requireAuth)

// get all
router.get("/", getAll)

// get one
router.get("/:id", getOne)

// post one
router.post("/", postOne)

// delete one
router.delete("/:id", deleteOne)

// update one
router.patch("/:id", updateOne)

module.exports = router
