const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

// Handle Uncaught exceptions
// what is Uncaught exception?
// if I write a code like this:
// console.log(a);  Here a is not defined. and error dibe.ei Dhoroner error handle korte hobe evabe..

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

// setting up config file

dotenv.config({ path: "backend/config/config.env" });

// Connecting To Database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// config . env file a DB_LOCAL_URI = mongodb://localhost:27017/shopit  Eta ase
// jodi mongodb er jaygay just mongod likha hoy  DB_LOCAL_URI = mongod://localhost:27017/shopit
// tahole oi error ta kibhabe handle korbe or show korbe
// then we will shut down the server

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
