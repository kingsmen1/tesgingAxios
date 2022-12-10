const express = require("express");
const Task = require("../models/taskModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find();
  if (tasks.length === 0) return next(new AppError("Please Create Task", 400));
  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks,
    },
  });
});

exports.createTask = catchAsync(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json({
    task,
  });
});

exports.getTask = catchAsync(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findById(taskId);
  if (!task) return next(new AppError(`No Task by this id : ${id} `, 404));
  res.status(200).json({
    status: "success",
    task,
  });
});

exports.updateTask = catchAsync(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) return next(new AppError(`No Task With the id:${taskId}`, 404));
  res.status(200).json({
    status: "Success",

    task,
  });
});

exports.deleteTask = catchAsync(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    return next(new AppError(`No document by this id:${req.params.id}`, 404));
  }
  res.status(204).json({
    status: "Success",
    task,
  });
});
