import { Request, Response } from "express";
import GameModel from "../models/game.model";
import { createGame, deletePermanentlyGame, getGames, patchGame, updateGame, updateStatusGame } from "../services/game.service";
import { dataGames } from "./../data/games";

export const getAllGames = async (req: Request, res: Response) => {
  const { active } = req.query;

  try {
    const allGames = await getGames(`${active}`, '');

    res.send(allGames);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getGamesById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const game = await getGames('true', id)
    res.send(game);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const statusGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { value }: any = req.query;
  if (value === undefined) value = false;
  try {
    res.send(await updateStatusGame(id, value));
  } catch (error) {
    res.status(404).send(error);
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedGame = await deletePermanentlyGame(id);
    res.send("The game was permanently removed");
  } catch (error) {
    res.status(404).send(error);
  }
};

export const featuredGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { value }: any = req.query;
  if (value === undefined) value = false;
  try {   
    res.send(await patchGame(id, 'featured', value));
  } catch (error) {
    res.status(404).send(error);
  }
};

export const isNewGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { value }: any = req.query;
  if (value === undefined) value = false;
  try {
    res.send(await patchGame(id, 'is_new', value));
  } catch (error) {
    res.status(404).send(error);
  }
};

export const postGame = async (req: Request, res: Response) => {
  const bodyGame = req.body;
  try {
    res.status(201).send(await createGame(bodyGame));

  } catch (error) {
    res.status(404).send(error);
  }
};

export const putGame = async (req: Request, res: Response) => {
  const bodyGame = req.body;
  try {
    res.send(await updateGame(bodyGame));
  } catch (error) {
    res.status(404).send(error);
  }
};

export const loadGames = async () => {
  try {
    if (!(await GameModel.find())?.length) {
      console.log("Loading games in database...");
      dataGames?.map(async (g) => {
        await GameModel.create({
          ...g,
          featured: g.rating > 4.5 ? true : false,
          active: true,
          price_with_sale: g.price - (g.price * g.on_sale / 100)
        });
      });
      console.log("🟢 Loading of games complete. 🟢");
    }
  } catch (error) {
    console.log(`Load Data Base: ${error}`);
  }
};
