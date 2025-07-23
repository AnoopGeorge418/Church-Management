const http = require('http');
const mongoose = require('mongoose');
const app = require('./app.js');
const server = http.createServer(app);
const dotEnv = require("dotenv")

// Connect to MongoDB server
dotEnv.config();
const linkToDB = process.env.CONNECTION_URL;

mongoose.connect(linkToDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`);
});
 
server.on('error', (err) => {
  console.error('Server error:', err); // handle error
});


const serverPort = process.env.SERVER_PORT || 5000;
server.listen(serverPort, () => {
  console.log(`Server running at http://localhost:${serverPort}/`);
});

// serve.listen(8000, () => {
//   console.log(`Server running at http://localhost:8000/`);
// });
