require("dotenv").config;
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

app.listen(PORT, HOSTNAME, () => {
	console.log(`App Started at http://${HOSTNAME}:${PORT}`);
});
