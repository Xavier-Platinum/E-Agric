const dotenv = require("dotenv");
dotenv.config;

const PORT = process.env.PORT || 9001;
const HOSTNAME = process.env.HOSTNAME || "localhost";

const express = require("express");
const path = require("path");
const logger = require("morgan")
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

// configuring morgan
app.use(logger("combined"));

// configuring express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express-session middleware

// passport // JWT

// connect flash

// Globla Env

// Setting up template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// routing
const defaultRoutes = require("./routes/defaultRoutes/defaults.routes");

// initializing routes
app.use("/", defaultRoutes);

app.listen(PORT, HOSTNAME, () => {
	console.log(`App running at http://${HOSTNAME}:${PORT}`);
});