const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home') 

const authController = require('../controllers/auth') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// add specific reoutes for specific tasks

router.get('/', homeController.getIndex)                // Handles initial GET request for the homepage
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router