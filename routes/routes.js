const express = require("express")
const routes = express.Router()
const controller = require('../controller/userAccountContorller')

// SignUp end-point
routes.post('/signup',controller.signup)

// Login end-point
routes.post('/login',controller.login)

// send Crypto end-point
routes.post('/send',controller.send)

// Fetch Balance end-point
routes.post('/fetchbalance',controller.fetchBalance)

module.exports={routes}