import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { changeRoleUser, getUser } from "../services/user.service";
import { checkUser } from "./auth.controllers";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "";

export const getUserByToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ").pop();
    if (token) {
      jwt.verify(token, JWT_SECRET, async (error: any, decodedToken: any) => {
        if (error) {
          res.send({ status: false });
        } else {
          const user: any = await getUser(decodedToken.id);

          res.send(user);
        }
      });
    } else {
      res.send({ status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: any = await getUser(id);

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const changeRole = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.body;
    const user = await changeRoleUser(id, role);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};