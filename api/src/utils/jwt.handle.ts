import jwt, { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateToken = (id: string) => {
  try {
    return jwt.sign({ id }, JWT_SECRET, {
      expiresIn: "3h",
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = (jwt: string) => {
  try {
    return verify(jwt, JWT_SECRET);
  } catch (error) {
    console.log(error);
  }
};