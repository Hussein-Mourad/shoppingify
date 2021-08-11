#!/usr/bin/env node

import http from "http";
import { connect } from "mongoose";
import app from "../src/index";

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

var server = http.createServer(app);

if (!process.env.DB_URI) {
  throw new Error("Make sure you have DB_URI in your environment variables.");
} else {
  connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
    .then((result) => {
      console.log(`Connected to db: ${result.connection.host}`);
      server.listen(port);
      server.on("error", onError);
      server.on("listening", onListening);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = "";
  if (addr)
    bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.info("Listening on " + bind);
}
