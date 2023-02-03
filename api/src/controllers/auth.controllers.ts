import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { loginUser, registerNewUser } from "../services/auth.service";
import { handleErrors } from "./../utils/error.handle";
import UserModel from '../models/user.model';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const checkUser = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ").pop();
  if (token) {
    jwt.verify(token, JWT_SECRET, async (error: any, decodedToken: any) => {
      if (error) {
        res.send({ status: false });
      } else {
        const user = await UserModel.findById(decodedToken.id);
        if (user) res.send({ status: true, user });
        else res.send({ status: false });
      }
    });
  } else {
    res.send({ status: false });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, password, role } = req.body;
    const resUser = await registerNewUser({
      name,
      lastname,
      email,
      password,
      role,
    });
    
    res.status(201).send(resUser);
  } catch (error: any) {
    console.log(error);
    const errors = handleErrors(error);
    res.status(200).send({ errors });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const resUser = await loginUser({ email, password });
    res.send(resUser);
  } catch (error: any) {
    console.log(error);
    const errors = handleErrors(error);
    res.status(200).send({ errors });
  }
};