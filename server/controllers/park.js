require('dotenv').config({ path: '../'})
const mongoose = require("mongoose");
const Park = require("../models/park");
const isAuth = require("../middleware/is-auth")
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SEND_GRID
    }
  })
);

exports.park_get_all = async (req, res, next) => {
  try {
    process.env.TZ
    const d = new Date()
    const my = d.toISOString();
    const result = await Park.find({ endTime: { $gte: my }}).sort({ startTime : 1, })
      res.status(200).json({
        message: "Successfully get all booking",
        result: result,
      })  
  } 
  catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error
    })
  }
}

exports.park_create_park = async (req, res, next) => {
  try {
    process.env.TZ
    const authData = await isAuth.getDetail(req, res, next)
    const park = new Park({
      name: authData.first_name + ' ' + authData.last_name,
      startTime : req.body.startTime,
      endTime: req.body.endTime,
      place: req.body.place,
      vehicle: req.body.vehicle,
      userId: authData._id
  })
  const result = await Park.find({ startTime: { $lte: req.body.endTime, $lte: req.body.startTime }, endTime: { $lte: req.body.endTime, $gte: req.body.startTime }, vehicle: req.body.vehicle, place: req.body.place })
  if(result.length < 10){
    const saveData = await park.save()
    const sendMail = await transporter.sendMail({
      to: authData.email,
      from: 'osamarizwan444@gmail.com',
      subject: 'Parking booked successfully',
      html: `  	
    <h1>PARKKARO</h1>
    <p>Thank you ${authData.first_name + ' ' + authData.last_name} for booking</p>
    <p>You booked a parking for ${req.body.vehicle} in ${req.body.place} from ${req.body.startTime} to ${req.body.endTime}.</p>
    `
    });
      res.status(201).json({
        message: "Successfully booking your parking",
    })
  }
  res.status(200).json({
    message: "Sorry there is no vacant place available for that time",
  })
  } 
  catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error 
    });
  };
}

exports.park_get_one = async (req, res, next) => {
  try {
    const authData = await isAuth.getDetail(req, res, next)
    const result = await Park.find({userId: authData._id})
    res.status(200).json({
      message: "Successfully get booked parking according to the id",
      result: result
    })
  } 
  catch (error) {
    res.status(500).json({
      message: "There is no data with that id",
      error: error
  })
  }
}
  
exports.park_search_one = async (req, res, next) => {
  try {
    process.env.TZ
    const { startTime, endTime, vehicle, place } = req.body; 
    const result = await Park.find({ startTime: { $lte: endTime, $lte: startTime }, endTime: { $lte: endTime, $gte: startTime }, vehicle: vehicle, place: place }, 'startTime endTime vehicle place')
    if(result.length < 8){
      res.status(200).json({
        message: 'Yes we have a vacant place of that time, please reserve your place by booking it!'
    });
    }
    else if(result.length < 10){
      res.status(200).json({
        message: 'Yes we have only one vacant place of that time, please hurry up and reserve your place by booking it!'
    });
    }
    else if(result.length > 9){
    res.status(200).json({
      message: "Sorry there is no vacant place available for that time"
    })
  }
  } 
  catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error
    })
  }
}