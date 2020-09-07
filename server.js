const express = require('express')
// Used to manage env variables
//Just like application.prop in springboot
const dotenv = require('dotenv')

// Load config:set the path to config file
dotenv.config({path: './config/config.env'})
