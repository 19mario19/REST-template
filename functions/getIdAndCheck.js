const mongoose = require("mongoose")

function getIdAndCheck(req) {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("No such data, the id is invalid")
  }
  return id
}

module.exports = getIdAndCheck
