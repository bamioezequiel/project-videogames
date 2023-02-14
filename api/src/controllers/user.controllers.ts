import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { changeRoleUser, getUser, getUsers } from "../services/user.service";
import { checkUser } from "./auth.controllers";
import jwt from "jsonwebtoken";
import { registerNewUser } from "../services/auth.service";
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

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: any = await getUsers();

    res.send(users);
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

export const loadAdmin = async () => {
  const bodyUser = {
    name: "Admin",
    lastname: "Admin",
    picture: "https://imgur.com/EyEFL9w.png",
    email: "admin@admin.com",
    password: "Admin123",
    active: true,
    role: "Owner",
  };

  try {
    if (!(await UserModel.find()).length) {
      console.log("Loading Admin in database...");
      registerNewUser({
        name: bodyUser.name,
        lastname: bodyUser.lastname,
        email: bodyUser.email,
        password: bodyUser.password,
        role: bodyUser.role,
        picture: bodyUser.picture
      });

      console.log("🟢 Loading Admin complete. 🟢");
    }
  } catch (error) {
    console.log(`Load Data Base: ${error}`);
  }
};