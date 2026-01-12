import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { STATUS_CODE } from "../constants/statusCode";

export class UserController {
  private userService = new UserService();

  async login(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const result = await this.userService.login({
      email,
      username,
      password,
    });

    return res.status(STATUS_CODE.OK).json(result);
  }

  async register(req: Request, res: Response) {
    const { username, email, password, idBrandMaster } = req.body;

    const user = await this.userService.register({
      username,
      email,
      password,
      idBrandMaster,
    });

    return res.status(STATUS_CODE.CREATED).json(user);
  }
}
