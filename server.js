const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './prod.env' });

const app = require('./app');

mongoose.connect(process.env.DATABASE).then(() => {
  console.log('DB connected!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED! Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed!');
  });
});
