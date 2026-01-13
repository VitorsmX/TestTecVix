import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { STATUS_CODE } from "../constants/statusCode";
import { UserService } from "../services/UserService";

export class UserController {
  constructor() {}
  private userService = new UserService();

  async getMe(req: CustomRequest<unknown>, res: Response) {
    const result = await this.userService.getUserById(req.body);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async getNewToken(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const result = await this.userService.getNewToken(String(idUser));
    return res.status(STATUS_CODE.OK).json(result);
  }

  async login(req: CustomRequest<unknown>, res: Response) {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const result = await this.userService.login(email, password);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async register(req: CustomRequest<unknown>, res: Response) {
    const result = await this.userService.register(req.body);
    return res.status(STATUS_CODE.CREATED).json(result);
  }

  async updateUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const result = await this.userService.updateUser(String(idUser), req.body);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async deleteUser(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const result = await this.userService.deleteUser(String(idUser));
    return res.status(STATUS_CODE.OK).json(result);
  }
}
