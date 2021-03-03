const mongoose = require("mongoose");
const Business = require("../models/business");

exports.business_get_all = async (req, res, next) => {
  try {
    const result = await Business.find()
    res.status(200).json({
    message: "Successfully get all business proposals",
    result: result
    }) 
  } 
  catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching business proposals",
      error: error
    })
  }
}

exports.business_create_msg = async (req, res, next) => {
  try {
    process.env.TZ
    const business = new Business({
      name: req.body.name,
      email: req.body.email,
      mblno: req.body.mblno,
      message: req.body.message,
    });
   const result = await business.save()
      res.status(201).json({
        message: "Thank you for your proposal We will contact you soon!!! Have a nice day...",
    })
  }
  catch (error) {
    res.status(500).json({
      message: "Something went wrong while posting your query",
      error: error
  })  
  }
}