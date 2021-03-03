const mongoose = require("mongoose");
const Help = require("../models/help");

exports.help_get_all = async (req, res, next) => {
  try {
    const result = await Help.find()
    res.status(200).json({
      message: "Successfully get all help query",
      result: result
    }) 
  } 
  catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching help queries",
      error: error
    })
  }
}

exports.help_create_msg = async (req, res, next) => {
  try {
    process.env.TZ
    const help = new Help({
      name: req.body.name,
      email: req.body.email,
      mblno: req.body.mblno,
      message: req.body.message,
  });
  const result = await help.save()
      res.status(201).json({
        message: "Created help query successfully We will contact you soon!!! Have a nice day...",
        result: result
    })
  }
  catch (error) {
    res.status(500).json({
      message: "Something went wrong while creating help query",
      error: error
  })  
  }
}