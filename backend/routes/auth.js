const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SIGN = 'hardikdesai$7';
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
let success = false

//ROUTE : 1 Create a user with a POST request on localhost:5000/api/auth/createuser 
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
            success = false
            return res.status(400).json({ "success": success, "error": "Sorry a user with this email is already exists" })
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
        success = true
        res.send({ success, authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occurred")
    }
})


//ROUTE : 2 login a user with a POST request on localhost:5000/api/auth/login 
router.post('/login', [
    body('email', "Enter Valid Email").isEmail(),
    body('password', "Enter Valid Password").exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: "Please Enter valid credentials" })
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            success = false
            return res.status(400).json({ "success": success, "error": "Please Enter valid credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        // generate Auth token using JWT 
        const authToken = jwt.sign(data, JWT_SIGN);
        // res.send(user)
        success = true
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occurred")
    }
})

//ROUTE : 3 Get logging user data using POST request on localhost:5000/api/auth/getuser 
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error Occurred")
    }
})


module.exports = router;
