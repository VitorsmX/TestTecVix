import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { UserModel } from "../models/UserModel";
import { genToken } from "../utils/jwt";

interface ILoginInput {
  email?: string;
  username?: string;
  password: string;
}

export class UserService {
  private userModel = new UserModel();

  async login(data: ILoginInput) {
    if (!data.email && !data.username) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.BAD_REQUEST,
      );
    }

    const user = await this.userModel.findByLogin({
      email: data.email,
      username: data.username,
    });

    if (!user) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_CREDENTIALS,
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    await this.userModel.updateLastLogin(user.idUser);

    const token = genToken({
      sub: user.idUser,
    });

    return {
      token,
      user: {
        idUser: user.idUser,
        username: user.username,
        email: user.email,
        role: user.role,
        idBrandMaster: user.idBrandMaster,
        isVituaxUser: !user.idBrandMaster,
        brandMaster: user.brandMaster,
      },
    };
  }

  async register(data: {
    username: string;
    email: string;
    password: string;
    idBrandMaster?: number;
  }) {
    return this.userModel.createUser(data);
  }
}
