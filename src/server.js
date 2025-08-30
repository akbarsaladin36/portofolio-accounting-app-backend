const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const routerNavigation = require('./routers')
dotenv.config()

const app = express()
const port = process.env.SERVER_PORT

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use("/accounting-app/api/v1", routerNavigation)

app.listen(port, () => {
  console.log(`✅ Your express backend server is connected at port ${port}`)
})