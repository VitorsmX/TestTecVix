import { user } from "@prisma/client";
import { VMModel } from "../models/VMModel";
import { TVMCreate, vMCreatedSchema } from "../types/validations/VM/createVM";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { TVMUpdate, vMUpdatedSchema } from "../types/validations/VM/updateVM";
import { vmListAllSchema } from "../types/validations/VM/vmListAll";
import { decrypt, encrypt } from "../utils/crypto";

export class VMService {
  constructor() {}

  private vMModel = new VMModel();

  async getById(idVM: number) {
    return this.vMModel.getById(idVM);
  }

  async listAll(query: unknown, user: user) {
    const validQuery = vmListAllSchema.parse(query);

    const listVm = await this.vMModel.listAll({
      query: validQuery,
      idBrandMaster:
        user.idBrandMaster || Number(validQuery.idBrandMaster) || undefined,
    });

    const canSeePassword = user.role !== "member";

    return {
      ...listVm,
      result: listVm.result.map((vm) => ({
        ...vm,
        pass: canSeePassword ? decrypt(vm.pass || "") : vm.pass,
      })),
    };
  }

  async createNewVM(data: TVMCreate, user: user) {
    if (user.role !== "admin" && user.role !== "manager") {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }

    const validateData = vMCreatedSchema.parse(data);

    const hashed = encrypt(validateData.pass || "");

    const preparedData = {
      ...validateData,
      idBrandMaster: validateData.idBrandMaster ?? undefined,
      vmName: validateData.vmName ?? undefined,
      os: validateData.os ?? undefined,
      status: "RUNNING" as const,
      pass: hashed,
    };

    const createdVM = await this.vMModel.createNewVM(preparedData);

    return createdVM;
  }

  async updateVM(idVM: number, data: TVMUpdate, user: user) {
    if (user.role !== "admin" && user.role !== "manager") {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }
    const validateDataSchema = vMUpdatedSchema.parse(data);
    const oldVM = await this.getById(idVM);

    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    if (validateDataSchema.pass) {
      validateDataSchema.pass = encrypt(validateDataSchema.pass);
    }

    return this.vMModel.updateVM(idVM, {
      ...validateDataSchema,
      idBrandMaster: oldVM.idBrandMaster,
    });
  }

  async deleteVM(idVM: number, user: user) {
    if (user.role !== "admin") {
      throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
    }
    const oldVM = await this.getById(idVM);
    if (!oldVM) {
      throw new AppError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const deletedVm = await this.vMModel.deleteVM(idVM);
    return deletedVm;
  }
}
