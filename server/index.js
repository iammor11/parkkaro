require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@parkkaro.moor4.mongodb.net/${process.env.MONGO_DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

mongoose.Promise = global.Promise;

//check connection
const db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to mongoDB")
})

//check for DB errors
db.on('error', () => {
    console.log("Get errors while connected to mongoDB");
})

app.use(helmet());
app.use(compression());

const authRoutes = require('./routes/auth');
const helpRoutes = require('./routes/help');
const businessRoutes = require('./routes/business');
const parkRoutes = require('./routes/park');
const paymentRoutes = require('./routes/stripe')
const feedbackRoutes = require('./routes/feedback')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    credentials: true
}))

//setup access-control-allow-origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
  next();
})

app.use('/api/business', businessRoutes);
app.use('/api/help', helpRoutes);
app.use('/api', authRoutes);
app.use('/api/park', parkRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/payment',paymentRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error) //when a file is not found instead of sending a 404 response, it instead calls next() to move in to the next middleware
})

const port =  process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server has started on port " + port )
})