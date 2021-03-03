require('dotenv').config({ path: '../'})
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SEND_GRID
    }
  })
);

exports.postLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const mblno = req.body.mblno;
    const password = req.body.password;  
    const user = await User.findOne(email ? { email: email } : { mblno: mblno})
      if (!user) {
        return res.status(422).json({
          message: 'Invalid email or mobile number.'
        });
      }
      if (!user.isVerified) {
        return res.status(422).json({
          message: 'please verify your email.'
        });
      }   
    const matchPass = await bcrypt.compare(password, user.password)
      if (!matchPass) {
        return res.status(422).json({
          message: "Wrong password"
        })
      }
    if (matchPass) {
      const token = jwt.sign(
        email ? {
                email: user.email,
                _id: user._id,
                status: user.userType,
                first_name: user.first_name,
                last_name: user.last_name
               }
              : {
                phone: user.phone,
                _id: user._id,
                status: user.userType,
                first_name: user.first_name,
                last_name: user.last_name
              },
        process.env.SECRET_KEY,
        {
          expiresIn: "7d"
        } 
      );
        return res.status(200).json({
          message: "Login successfully",
          status: user.userType,
          id: user._id,
          token: token
        })
      }
    }
catch (error) {
  res.status(500).json({
    message: "Login failed",
    error: error
  })
}
}

exports.postReset = async (req, res, next) => {
    try {
      process.env.TZ;
      const email = req.body.email;
      let token;
      const bufferToken = await crypto.randomBytes(32, (err, buffer) => {
        if (err) {
        return res.status(500).json({
            message: "Getting error while generating token"
          })
        }
        token = buffer.toString('hex'); 
      }) 
      const user = await User.findOne({ email: req.body.email })
        if (!user) {
         return res.status(404).json({
            message: "No account with that email found."
          })
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        const updatedUser = await user.save();
        const result = await User.findOne({ email: email})
        const sendMail = await transporter.sendMail({
          to: result.email,
          from: 'osamarizwan444@gmail.com',
          subject: 'For reset password',
          html: `  	
        <h1>PARKKARO</h1>
        <h2>Reset your password?</h2>
        <p>If you requested a password reset then</p>
        <p>Click below link to reset your password and it will expire after one hour</p>
        <p>If you didn't make this request, ignore this email</p>
        <a href="https://mor-parkkaro.web.app/reset/${result.resetToken}" to="_blank"><button>Reset</button></a>
          `
        });
        return res.status(200).json({
          message: "Email send successfully to your email address to change the password"
        })
        } 
      catch (error) {
      return res.status(500).json({
        message: "Something went wrong"
      })    
  }
};

exports.postNewPassword = async (req, res, next) => {
  try {
    process.env.TZ
    const token = req.params.token
    const newPassword = req.body.password;
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() }})
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const updatedUser = await User.findByIdAndUpdate({ _id: user._id}, {$set : {password: hashedPassword, resetToken: null, resetTokenExpiration: null}})
    const result = await User.findById({_id: updatedUser._id})
    res.status(201).json({
      message: "Password changes successfully"
    })            
    } 
  catch (error) {
    res.status(500).json({
      message: "Something went wrong, May be your token is expired",
      error: error
    })
}
}

exports.postSignup = async (req, res, next) => {
  try {
    process.env.TZ
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const mblno = req.body.mblno;
    let token;
    const checkUser = await User.findOne({email: email})
    if(checkUser){
      return res.status(401).json({
        message: "E-Mail exists already, please pick a different one."
      })
    }
    const bufferToken = await crypto.randomBytes(32, (err, buffer) => {
      if (err) {
      return res.status(500).json({
          message: "Getting error while generating token"
        })
      }
      token = buffer.toString('hex'); 
    })
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
      mblno: mblno,
      resetToken: token,
      resetTokenExpiration: Date.now() + 3600000
    });
    const data = await user.save()
    const result = await User.findOne({ email: email})
    const sendMail = await transporter.sendMail({
      to: email,
      from: 'osamarizwan444@gmail.com',
      subject: 'Verify your email address',
      html: `
      <h1>PARKKARO</h1>
      <h2>Verify your email address</h2>
      <p>You are requested to verify your email.</p>
      <p>Click below link to verify your email and it will expire after one hour</p>
      <p>If you didn't make this request, ignore this email</p>
      <a href="https://mor-parkkaro.web.app/verify/${token}" to="_blank"><button>Verify</button></a>
      `
    });
    return res.status(200).json({
      message: "Signup successfully and email has been send to your email for verification"
    })
    } 
  catch (error) {
    res.status(500).json({
      message: "Something went wrong, please try again",
      error: error
    })
  }
}
  
exports.verify = async (req, res, next) => {
  try {
    process.env.TZ
    const token = req.params.token
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() }})
    const verifyUser = await User.findByIdAndUpdate({ _id: user._id}, {$set : {isVerified: true, resetToken: null, resetTokenExpiration: null}})
    const updatedUser = await User.findById({_id: verifyUser._id})
    res.status(201).json({
      message: "Email verify successfully"
    })            
    } 
  catch (error) {
    res.status(500).json({
      message: "Something went wrong, May be your token expires",
      error: error
    })     
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    process.env.TZ
    const result = await User.find({}, '-resetToken -resetTokenExpiration -password -isDeleted -mblno')    
    res.status(200).json({
      message: "Successfully get all users",
      result: result
    });
  } 
  catch (error) {
    res.status(500).json({
      message: "Something went wrong while getting users",
      error: error
    });
  }
}