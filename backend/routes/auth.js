const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SIGN = 'hardikdesai$7';
const { body, validationResult } = require('express-validator');

// Create a user with a POST request on localhost:5000/api/auth/createuser 
router.post('/createuser', [
    body('name', "Enter Valid Name").isLength({ min: 3 }),
    body('email', "Enter Valid Email").isEmail(),
    body('password', "Enter Valid Password").isLength({ min: 5 })
], async (req, res) => {

    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        // Check whether the user with this email exists already   
        if (user) {
            return res.status(400).json({ "error": "Sorry a user with this email is already exists" })
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        // generate Auth token using JWT 
        const authToken = jwt.sign(data, JWT_SIGN);
        // res.send(user)
        res.send({ authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occurred")
    }
})

module.exports = router;
