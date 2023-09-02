// REST API using MongoDb
require("dotenv").config()
const { format } = require("date-fns")
const express = require("express")
const yourRoutes = require("./routes/routes")
const userRoutes = require("./routes/user")
const { mongoose } = require("mongoose")

// constants
const MONGO_URI = process.env.MONGO_URI // get the uri from MongoDb Atlas
const PORT = process.env.PORT || 3000

// express app
const app = express()

// middleware
app.use(express.json()) // adds body to request (req.body)
app.use((req, _, next) => {
  const currentDate = format(new Date(), "HH:mm:ss dd/MM/yyyy")
  console.log(req.method, req.path, currentDate)
  next()
})

const apiPathName = "data"
const fullPath = `/api/${apiPathName}/`

//routes
app.use("/api/users", userRoutes)
app.use(fullPath, yourRoutes)

// connect to db and start the server
if (MONGO_URI) {
  async function connectDb() {
    try {
      await mongoose.connect(MONGO_URI)
      // Start the server just after the connection to the DB
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
      })
    } catch (error) {
      console.error(error)
    }
  }
  connectDb()
}

app.get("/", (_, res) => {
  res.json({ mssg: `Use ${fullPath} for this API ` })
  res.redirect(fullPath)
})
