import { compare, hash } from "bcryptjs";

export const encrypt = async (password: string) => {
  return await hash(password, 8);
};

export const verifyPassword = async (password: string, passwordHash: string) => {
  return await compare(password, passwordHash);
};