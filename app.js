const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const taskRouter = require("./routes/taskRoutes");
const globalErrorHandler = require("./controllers/errorController");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/tasks", taskRouter);

app.use(globalErrorHandler);

module.exports = app;
