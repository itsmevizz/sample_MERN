const { response } = require('express');
const asyncHandler = require('express-async-handler')
const user = require("../models/userModel");
const generateToken = require('../utils/genarateToken')
var objectId = require("mongodb").ObjectId;

module.exports = {
  registerUser: asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    const userExists = await user.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User Exists");
    }
    const User = await user.create({
      name,
      email,
      password,
    });
    if (User) {
      res.status(200).json({
        _id: User._id,
        name: User.name,
        email: User.email,
        token: generateToken(User._id)
      })
    } else {
      res.status(400)
      throw new Error('Error...!')
    }
  }),

  authUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const User = await user.findOne({ email })

    console.log(User);

    const checkStatus = () => {
      if (User.status) {
        return true
      } else {
        throw new Error('Blocked User')
      }
    }

    if (User && checkStatus() && (await User.matchPassword(password))) {
      res.json({
        _id: User._id,
        name: User.name,
        token: generateToken(User._id)
      })
      console.log({ token: generateToken(User._id) });
    } else {
      res.status(400)
      throw new Error('Invalid Email or Password...!')
      res.send('Hi')
    }

  }),
  getUserData: asyncHandler(async (req, res) => {
    const users = await user.find({ user })
    res.json({
      users
    })
  }),
  blockUser: asyncHandler(async (req, res) => {
    const { _id } = req.body
    const User = await user.findOne({ _id }).catch(() => { throw new Error('User Not found') })
    await User.updateOne({
      $set: { status: false }
    })
    res.json({ User })
  }),
  unBlockUser: asyncHandler(async (req, res) => {
    const { _id } = req.body
    const User = await user.findOne({ _id }).catch(() => { throw new Error('User Not found') })
    await User.updateOne({
      $set: { status: true }
    })
    res.json({ User })
  }),
  addUser: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await user.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User Exists");
    }
    const User = await user.create({
      name,
      email,
      password,
    }).then(({ _id, name, email, status }) => {
      res.status(200).json({
        _id: _id,
        name: name,
        email: email,
        status: status,
        token: generateToken(_id)
      })
    })
    // if (User) {

    // } else {
    //   res.status(400)
    //   throw new Error('Error...!')
    // }

  })

}

