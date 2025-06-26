const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authUser = require("../middleware/authUser.js");

// USER SCHEMA AND ENDPOINTS
// SCHEMA (Typical User)

const router = express.Router();

// USER REGISTRATION ENDPOINT (/api/user/register)
// { "email": "name@server.com", "password": "abc123", "firstName": "April", "lastName": "May" }

router.post("/register", (req, res) => {
  // Checkto see if the user's account exists or not

  User.findOne({ email: req.body.email })
    .then(result => {
      if (result) {
        res.status(400).send("User already exists");
      }

      // Create the new User object
      let newUser = new User(req.body);

      // Hash the user password (and salt it)
      newUser.password = bcrypt.hashSync(newUser.password, 10);

      // Save the user account
      newUser.save()
        .then(result => {
          res.status(201).send(result);
        })
        .catch(err => {
          res.status(400).send(err);
        })
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

// LOGIN ENDPOINT (/api/user/login)
// { "email": "aprilmay@gmail.com", "password": "abc123" }

router.post("/login", (req, res) => {
  // Look for the user to see if they exist
  User.findOne({ email: req.body.email })
    .then(result => {
      if (!result) {
        res.status(400).send("Invalid email/password");
      }

      // Step 1 is compare the user's set password to the stored hash

      bcrypt.compare(req.body.password, result.password, (err, bcresult) => {
        if (bcresult) { // if bcresult is defied, the password was a match
          // At this point the username/password are valid

          // Step 2: Create and issue the JWT

          let payLoad = {
            _id: result._id,
            role: result.role
          }

          // Create the token (sign it)

          let token = jwt.sign(payLoad, "12345678");

          // Send the token to the client
          res.status(200).send({ jwt: token });
        } else {
          res.status(400).send("Invalid email/password");
        }
      })
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

// GET (Read All Users)

router.get("/", (req, res) => {
  User.find().exec()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

// Get (Read One User)
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Not Found!");
      }
    })
    .catch(err => {

    })
})

// POST (New User)
router.post("/", (req, res) => {
  let newUser = new User(req.body);

  newUser.save()
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    })
})

// PATCH (Update)
router.patch("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id, // The id of the user
    req.body, // The object that contains the changes
    {
      new: true, // return the updated object
      runValidator: true // make sure the updates are validated against the schema
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    })
})

// DELETE (Delete User)
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

module.exports = router;

