import { prisma } from "../database/client";
import { TUserCreated } from "../types/validations/User/createUser";
import { TUserUpdated } from "../types/validations/User/updateUser";

export class UserModel {
  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
    });
  }

  async findById(idUser: string) {
    return prisma.user.findUnique({
      where: { idUser },
    });
  }

  async createUser(data: TUserCreated) {
    return prisma.user.create({ data });
  }

  async updateUser(idUser: string, data: TUserUpdated) {
    return await prisma.user.update({
      where: { idUser },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteUser(idUser: string) {
    return await prisma.user.update({
      where: { idUser },
      data: { isActive: false, updatedAt: new Date(), deletedAt: new Date() },
    });
  }
}
