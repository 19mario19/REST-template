const mongoose = require("mongoose")

const { Schema, model } = mongoose

// keep user, for the authorization part

const dataSchema = new Schema(
  {
    data: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  },
)

const Model = model("Model", dataSchema)
module.exports = Model
