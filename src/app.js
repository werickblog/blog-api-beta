"use strict";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

// Root route
import Routes from './api/routes';

// API
import API from './api/api';

const app = express();

// Configure Dotenv to read environment variables from .env file
// automatically
dotenv.config();

// Define json body reader
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname, { dotfiles: "allow" }));

// Enable proxy x-Forwadded-*
app.enable("trust proxy");

// Enables CORS
app.use(cors());

// Define endpoints
app.use(Routes.root, API)

// Set port
app.set("port", process.env.PORT || 6500);

// Initialize server
app.listen(app.get("port"), err => {
  if (err) {
    console.log(chalk.red(err.message));
  } else {
    console.log(chalk.green(`Server is running on port ${app.get('port')}`));
  }
});