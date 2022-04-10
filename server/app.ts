import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { adminMessage, socket } from "./middleware/webSocket";

//Connects to the Database -> then starts the express
AppDataSource.initialize()
  .then(async (connection) => {
    // Create a new express application instance
    const app = express();
    const path = require("path");
    const http = require("http");

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    // register express routes from defined application routes

    app.use(express.static(path.join(__dirname, "build")));

    app.get("/", function (req, res) {
      res.sendFile(path.join(__dirname, "build", "index.html"));
    });

    app.use("/api/v1", routes);

    const server = app.listen(3000);
    socket(server);

  })
  .catch((error) => console.log(error));
