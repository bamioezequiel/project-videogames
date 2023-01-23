import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import { verifyToken } from "../utils/jwt.handle";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ").pop();
    const tokenData: any = verifyToken(`${token}`);
    if (tokenData.id) {
      next();
    } else {
      res.status(409).send({ error: "Access denied" });
    }
  } catch (error) {
    console.log(error);
    res.status(409).send({ error: "Access denied" });
  }
};

export const checkRoleAuth = (roles: Array<string>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ").pop();
    const tokenData: any = verifyToken(`${token}`);
    if(tokenData.id) {
        const user = await UserModel.findOne({email: tokenData.id});
        if(user && [...roles].includes(user.role)) {
            next();
        } else {
            res.status(409).send({error: "You don't have permissions"})
        }
    }
  } catch (error) {
    res.status(409).send({error: "You don't have permissions"})
  }
};