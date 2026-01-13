import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import bcrypt from "bcryptjs";
import { TUserCreated } from "../types/validations/User/createUser";
import { genToken } from "../utils/jwt";
import { UserModel } from "../models/UserModel";
import { userUpdatedSchema } from "../types/validations/User/updateUser";

export class UserService {
  constructor() {}

  private userModel = new UserModel();

  async getUserById(idUser: string) {
    const user = await this.userModel.findById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }
    return user;
  }

  async getNewToken(idUser: string) {
    const user = await this.userModel.findById(idUser);

    if (!user) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    if (!user.isActive) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.FORBIDDEN);
    }

    const token = genToken({ id: user.idUser, role: user.role });

    return { token };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    const token = genToken({ id: user.idUser, role: user.role });

    return {
      token,
      user: user,
    };
  }

  async register(data: TUserCreated) {
    const exists = await this.userModel.findByEmail(data.email);

    if (exists) {
      throw new AppError(
        ERROR_MESSAGE.USER_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT,
      );
    }

    const hashed = await bcrypt.hash(data.password, 10);

    return await this.userModel.createUser({
      ...data,
      isActive: true,
      password: hashed,
    });
  }

  async updateUser(idUser: string, data: unknown) {
    const validateDataSchema = userUpdatedSchema.parse(data);
    const oldUser = await this.getUserById(idUser);

    if (!oldUser) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const updatedVM = await this.userModel.updateUser(
      idUser,
      validateDataSchema,
    );
    return updatedVM;
  }

  async deleteUser(idUser: string) {
    const oldUser = await this.getUserById(idUser);
    if (!oldUser) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const deletedVm = await this.userModel.deleteUser(idUser);
    return deletedVm;
  }
}
