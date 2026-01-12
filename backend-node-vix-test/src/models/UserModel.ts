import { prisma } from "../database/client";
import bcrypt from "bcrypt";

interface ILoginData {
  email?: string;
  username?: string;
  password: string;
}

interface ICreateUser {
  username: string;
  email: string;
  password: string;
  idBrandMaster?: number;
}

export class UserModel {
  async findByLogin({ email, username }: Omit<ILoginData, "password">) {
    return prisma.user.findFirst({
      where: {
        deletedAt: null,
        isActive: true,
        ...(email && { email }),
        ...(username && { username }),
      },
      include: {
        brandMaster: true,
      },
    });
  }

  async createUser(data: ICreateUser) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        idBrandMaster: data.idBrandMaster ?? null,
      },
    });
  }

  async updateLastLogin(idUser: string) {
    return prisma.user.update({
      where: { idUser },
      data: {
        lastLoginDate: new Date(),
      },
    });
  }
}
