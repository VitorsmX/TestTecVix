import jwt from "jsonwebtoken";

const secret = process.env.SIGN_HASH as string;

export interface IPayload {
  id: string;
  role: string;
}

export const jwtVerifySign = (token: string): IPayload | null => {
  try {
    if (!token) return null;

    const data = jwt.verify(token, secret) as IPayload;
    return data;
  } catch {
    return null;
  }
};
