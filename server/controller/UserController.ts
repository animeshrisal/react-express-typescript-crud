import { DataSource, getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }
}
