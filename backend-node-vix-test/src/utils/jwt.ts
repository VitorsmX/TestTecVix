import jwt, { TokenExpiredError } from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export interface IPayload {
  id: string;
  role: string;
}

export const genToken = (payload: IPayload): string => {
  return jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string): IPayload | null => {
  try {
    const data = jwt.verify(token, secret) as IPayload;
    return data;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return null;
    }
    return null;
  }
};
