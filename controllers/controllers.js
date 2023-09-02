const Model = require("../models/model")
const getIdAndCheck = require("../functions/getIdAndCheck")
const handleDataNotFound = require("../functions/handleDataNotFound")

// Get all data
async function getAllData(_, res) {
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
async function getData(req, res) {
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
async function createOne(req, res) {
  const { data: dataBody } = req.body
  // Add document to the database
  try {
    const data = await Model.create(dataBody)
    res.status(200).json(data)
    console.log(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete one data by ID
async function deleteData(req, res) {
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
async function updateData(req, res) {
  const { data: dataBody } = req.body
  try {
    const id = getIdAndCheck(req)
    const data = await Model.findByIdAndUpdate({ _id: id }, { dataBody })
    const updatedData = await Model.findById({ _id: id })
    handleQuizNotFound(res, data)

    res
      .status(200)
      .json({ mssg: `This data with id: ${id} has been updated`, updatedData })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getAllData,
  getPersonalData,
  getData,
  createOne,
  deleteData,
  updateData,
}
