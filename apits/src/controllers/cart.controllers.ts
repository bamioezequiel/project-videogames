import { Response, Request } from "express";
import { addAssociation } from "sequelize-typescript";
import { Cart, Game, User } from "../db";

export const getCart = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(404).send(`Error, route <Get, >: ${error}`);
  }
};

export const getDeleteCart = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(404).send(`Error, route <Get, >: ${error}`);
  }
};

export const addCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { gameId } = req.query;

  try {
    const user = await User.findOne({
      where: {
        id
      },
      include: [Cart],
    });
    const game = await Game.findOne({
      where: {
        id: gameId,
      },
    });
    if (!user || !game) {
      return res
        .status(400)
        .send(`Error, route <Add, AddCart>: User not found `);
    }
    console.log(user);
    res.send(user)
  } catch (error) {
    res.status(404).send(`Error, route <Add, AddCart>: ${error}`);
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(404).send(`Error, route <Delete, >: ${error}`);
  }
};
