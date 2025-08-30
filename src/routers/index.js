const express = require('express')
const Route = express.Router()
const authRoute = require('./auth')
const userRoute = require('./user')
const accountRoute = require('./account')
const contactRoute = require('./contact')
const transactionRoute = require('./transaction')
const journalEntryRoute = require('./journalEntry')

Route.use("/auth", authRoute)
Route.use("/users", userRoute)
Route.use("/accounts", accountRoute)
Route.use("/contacts", contactRoute)
Route.use("/transactions", transactionRoute)
Route.use("/journals", journalEntryRoute)

module.exports = Route