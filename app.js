const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 9001;
const HOSTNAME = process.env.HOSTNAME || "localhost";

const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const path = require("path");
const logger = require("morgan")
const session = require("express-session");
const ejs = require("ejs");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const helmet = require("helmet");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
require("./config/passport")(passport);
const bodyParser = require("body-parser");
const { globalVariables } = require("./config/config");
const MONGO_LOCAL = require("./config/db.config").MONGO_URI_LOCAL;

const app = express();

// compression algorithm
// app.use(compression());

// Security middleware
// app.use(helmet());


// configuring database
mongoose.connect(MONGO_LOCAL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then((res) => {
	console.log(`Database connected successfully`)
})
.catch((err) => {
	console.log(`Db connection failed ${err}`)
})


// configuring morgan
// app.use(logger("combined"));
app.use(logger("dev"));
app.use(cookieParser());

// configuring express
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Setting up template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express-session middleware
app.use(session({
	secret: `${process.env.COOKIE_SECRET}`,
	resave: false, 
	saveUninitialized: false,
	cookie: { secure: false, maxAge: Date.now() + 60000},//24hours
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		ttl: 600 * 6000
	})
	
}))

// passport // JWT
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Globla Env
app.use(globalVariables);

// routing
// DEFAULT ROUTES //
const defaultRoutes = require("./routes/defaultRoutes/defaults.routes");
// AUTH ROUTES //
const authRoutes = require("./routes/auth/auth.routes");
// VENDORS ROUTES
const vendorRoutes = require("./routes/vendorsRoutes/vendor.routes");
// ADMIN ROUTES
const adminRoutes = require("./routes/adminRoutes/admin.routes");
// FARMERS ROUTES
const farmersRoutes = require("./routes/farmersRoutes/farmer.routes");
// USERS ROUTES
const userRoutes = require("./routes/usersRoutes/users.routes");
// CART ROUTES
const cartRoutes = require("./routes/cartRoutes/cart.routes")



// initializing routes
app.use("/", defaultRoutes);
app.use("/auth", authRoutes)
app.use("/vendor", vendorRoutes);
app.use("/admin", adminRoutes);
app.use("/farmer", farmersRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes	)

// Error Handling 
app.use(async(req, res, next) => {
	res.send(`Sorry the page you are looking for cannot be found 
		or broken URL
		if you are not redirected to home click $<a href="/">here</a>
	`)
	console.log(req.originalUrl);
	// res.redirect("/")
	next();
	// res.redirect("/");
})

app.listen(PORT, HOSTNAME, () => {
	console.log(`App running at http://${HOSTNAME}:${PORT}`);
});