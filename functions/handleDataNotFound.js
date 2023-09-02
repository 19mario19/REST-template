function handleDataNotFound(res, data) {
  if (!data) {
    return res.status(400).json({ error: "data not found" })
  }
}

module.exports = handleDataNotFound
