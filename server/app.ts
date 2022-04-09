import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";

//Connects to the Database -> then starts the express
AppDataSource.initialize()
  .then(async (connection) => {
    // Create a new express application instance
    const app = express();
    const path = require('path');

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    app.listen(8000, () => {
      console.log("Server started on port 8000!");
    });
  })
  .catch((error) => console.log(error));
