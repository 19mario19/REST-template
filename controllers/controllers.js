const Model = require("../models/model")
const getIdAndCheck = require("../functions/getIdAndCheck")
const handleDataNotFound = require("../functions/handleDataNotFound")

// Get all data
async function getAll(_, res) {
  try {
    const dataList = await Model.find({}).sort({ createdAt: -1 })
    res.status(200).json(dataList)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get personal data
async function getPersonalData(req, res) {
  const {
    user: { email },
  } = req
  console.log(email)
  // Add email to find, and it will show just personal
  try {
    const dataList = await Model.find({ user: email }).sort({ createdAt: -1 })
    res.status(200).json(dataList)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get one data by ID
async function getOne(req, res) {
  try {
    const id = getIdAndCheck(req)
    const data = await Model.findById({ _id: id })
    handleDataNotFound(res, data)

    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Create new data
async function postOne(req, res) {
  const { data: dataBody } = req.body
  const { email: user } = req.user

  // Add document to the database
  try {
    const data = await Model.create({
      data: dataBody,
      user,
    })
    res.status(200).json(data)
    console.log(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete one data by ID
async function deleteOne(req, res) {
  try {
    const id = getIdAndCheck(req)
    const data = await Model.findByIdAndDelete({ _id: id })
    handleDataNotFound(res, data)

    res
      .status(200)
      .json({ mssg: `This data with id: ${id} has been deleted`, data })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// update
async function updateOne(req, res) {
  const { data: dataBody } = req.body
  try {
    const id = getIdAndCheck(req)
    console.log("id", id)
    console.log("dataBody", dataBody)
    const data = await Model.findByIdAndUpdate({ _id: id }, { data: dataBody })
    const updatedData = await Model.findById({ _id: id })
    handleDataNotFound(res, data)

    res
      .status(200)
      .json({ mssg: `This data with id: ${id} has been updated`, updatedData })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getAll,
  getPersonalData,
  getOne,
  postOne,
  deleteOne,
  updateOne,
}
