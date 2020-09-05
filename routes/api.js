const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const saltRounds = 10

const User = require("../models/User")

// Get all users
router.get("/users", async (req, res) => {
  const users = await User.find()
  res.send(users)
})

router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params.id
    })
    res.send(user)
  } catch (e) {
    res.status(404)
    res.send({
      message: "User doesn't exist!",
      error: e
    })
  }
})

router.post("/users", async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const user = new User({
      pseudo: req.body.pseudo,
      password: hash,
    })
    await user.save()
    res.send(user)
  });

})

router.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id
    })

    if (req.body.pseudo) {
      user.pseudo = req.body.pseudo
    }

    if (req.body.password) {
      user.password = req.body.password
    }

    await user.save()
    res.send(user)
  } catch (e) {
    res.status(404)
    res.send({
      message: "User doesn't exist!",
      error: e
    })
  }
})

router.delete("/users/:id", async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    })
    res.status(204).send()
  } catch (e) {
    res.status(404)
    res.send({
      message: "User doesn't exist!",
      error: e
    })
  }
})

module.exports = router