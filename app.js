/* eslint-disable prettier/prettier */
const express = require("express")
const config = require("config")
const mongoose = require("mongoose")

const app = express()

app.use(express.json({ extended: true }))

app.use("/api/auth", require("./routes/auth.routes"))

const PORT = config.get("port") || 5000

async function start() {
  try {
    await mongoose.connect(
      `${config.get("mongoUri")}/${config.get("mongoAppName")}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    )
    app.listen(PORT, () => console.log(`App is start. port ${PORT}`))
  } catch (error) {
    console.log("Server Error", error.message)
    process.exit(1)
  }
}

start()