// const connectToMongo= require('./db')
// const express = require('express')
// connectToMongo(); 
// const app = express() 
// const port = 5000 

// const cors = require('cors')
// app.options('*', cors()); // Enable CORS for all routes

// app.use(cors({
//   origin: 'https://i-notebok-main-9n2b.vercel.app', // Allow only this origin
//   methods: ['GET', 'POST','PUT','DELETE'], // Specify allowed methods
//   credentials: true ,// If using cookies or authentication
//   allowedHeaders: ['Content-Type', 'auth-token'],
// }));

//   app.use(express.json());
//  //Available routes

//  app.use('/api/auth',require('./routes/auth'))
//  app.use('/api/notes',require('./routes/notes'))
// app.get('/', (req, res) => {
//   res.send('Hello Avinash - Welcome to the world of Node.js')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

// Connect to MongoDB
connectToMongo();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://i-notebok-main-9n2b.vercel.app', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'auth-token'],
  credentials: true, // If using cookies or authentication
}));

app.options('*', cors());

app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello Avinash - Welcome to the world of Node.js');
});

// Export the app as a module (required for Vercel serverless functions)
module.exports = app;
