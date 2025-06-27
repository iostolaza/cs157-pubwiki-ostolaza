
// routes/user.js

const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authUser = require("../middleware/authUser.js");

// REGISTRATION ENDPOINT 
router.post("/register", async (req, res) => {
  try {
    let existing = await User.findOne({ email: req.body.email });
    if (existing) return res.status(400).send("User already exists");
    let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

// LOGIN ENDPOINT 
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email/password");
  let match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send("Invalid email/password");
  let token = jwt.sign({ _id: user._id, role: user.role }, "12345678");
  res.status(200).send({ jwt: token });
});

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

