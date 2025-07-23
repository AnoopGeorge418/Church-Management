const http = require('http');
const mongoose = require('mongoose');
const app = require('./app.js');
const server = http.createServer(app);
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB server
mongoose.connect( process.env.CONNECTION_URL, {
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


const serverPort = process.env.SERVER_PORT || 8000;
server.listen(serverPort, () => {
  console.log(`Server running at http://localhost:${serverPort}/`);
});

// serve.listen(8000, () => {
//   console.log(`Server running at http://localhost:8000/`);
// });
