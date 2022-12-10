const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception 💥SHUTTING DOWN ");
  console.log(err.name, err.message);
  process.exit(1); //1 stands for unhandled rejection , 0 for success.
});

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
    const port = 3000;
    const server = app.listen(port, () => {
      console.log(`listening on port ${port}`);
      process.on("unhandledRejection", (err) => {
        console.log(err.name, err.message);
        console.log("UNHANDLED REJECTION 💥SHUTTING DOWN ");
        server.close(() => {
          process.exit(1); //1 stands for unhandled rejection , 0 for success.
        });
      });
    });
  })
  .catch((error) => console.log(error));
