require('dotenv').config({ path: '../'})
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_KEY);

exports.my = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({ amount: req.body.amount, currency: "usd"})
    res.status(201).json({
      result: paymentIntent,
      message: "payment transfer successfully "
    });
  } 
  catch (error) {
    res.status(500).json({
      error: error,
      message: "Getting error while get payment"
    });
  }
}