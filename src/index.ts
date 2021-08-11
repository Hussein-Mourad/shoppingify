import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { Application } from "express";
// import createError from "http-errors";
import logger from "morgan";
import path from "path";

dotenv.config();

const app: Application = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.send("sfgfghfgh");
});

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