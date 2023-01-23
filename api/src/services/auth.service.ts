import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { encrypt, verifyPassword } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export const registerNewUser = async ({
  name,
  lastname,
  email,
  password,
  role,
}: User) => {
  const checkIs = await UserModel.findOne({ email });
  if (checkIs) throw "USER_ALREADY";

  const passHash = await encrypt(password);
  const user = await UserModel.create({
    name,
    lastname,
    email,
    password: passHash,
    role
  });

  return user;
};

export const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email });
  if (!checkIs) throw "USER_NOT_FOUND";

  const passHash = checkIs.password;
  const isCorrect = await verifyPassword(password, passHash);
  if (!isCorrect) throw "PASSWORD_INCORRECT";

  const token = generateToken(`${checkIs._id}`);
  
  return {
    token,
    user: {
      _id: checkIs._id,
      email: checkIs.email,
      name: checkIs.name,
      lastname: checkIs.lastname,
      role: checkIs.role,
    },
  };
};