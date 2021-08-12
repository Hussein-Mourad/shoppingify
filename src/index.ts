import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Application } from "express";
import session from "express-session";
// import createError from "http-errors";
import logger from "morgan";
import path from "path";
import connectDB from "./config/db";
import authRouter from "./routes/auth";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || "8000";

connectDB(() => {
  app.listen(port);
  console.info("Listening on http://localhost:" + port);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
  })
);

app.use("/auth/", authRouter);

// app.use("/", require("./routes/index"));
// app.use("/users", require("./routes/users"));

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
// next(createError(404));
// });

// error handler
// app.use(function (
//   err,
//   req,
//   res: Response,
//   next: NextFunction
// ) {
//   // set locals, only providing error in development
//   // @ts-ignore
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   // @ts-ignore
//   res.status(err.status || 500);
//   res.render("error");
// });

export default app;
