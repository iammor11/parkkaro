const mongoose = require("mongoose");
const Feedback = require("../models/feedback");
const isAuth = require("../middleware/is-auth")

exports.feedback_get_all = async (req, res, next) => {    
  try {
    const result = await Feedback.find()
    res.status(200).json({
    message: "Successfully get all feedback",
    result: result
    }) 
  } 
  catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching feedback",
      error: error
      });
  }
} 
  
exports.feedback_create_msg = async (req, res, next) => {
  try {
    process.env.TZ
    const authData = await isAuth.getDetail(req, res, next)
    const feedback = new Feedback({
        name: authData.first_name + ' ' + authData.last_name,
        message: req.body.message,
        userId: authData._id
    });
    const result = await feedback.save()
        res.status(201).json({
        message: "Thank you for your feedback! Have a nice day...",
    })
  }
  catch (error) {
    res.status(500).json({
      message: "Something went wrong while posting your feedback",
      error: error
  });  
  }
}
  
exports.feedback_get_msg = async (req, res, next) => {
  try {
    const authData = await isAuth.getDetail(req, res, next)
    const result = await Feedback.find({ userId: authData._id})
    res.status(200).json({
      message: "Successfully get all feedback",
      result: result
  });
  } 
  catch (error) {
    res.status(500).json({
      message: "There is no feedback",
      error: error
    });
  }
}