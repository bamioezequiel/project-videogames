import { Request, Response } from "express";
import GameModel from "../models/game.model";
import { dataGames } from "./../data/games";

export const getAllGames = async (req: Request, res: Response) => {
  const { active } = req.query;

  try {
    if (active === "true") {
      const games = await GameModel.find({
        where: {
          active: true,
        },
      });

      res.send(games);
    } else {
      const allGames = await GameModel.find({
        paranoid: false,
      });

      res.send(allGames);
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getGamesById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const game = await GameModel.findById(id);
    //paranoid: false
    if(!game) return res.status(400).send('The game not found')
    res.send(game);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const statusGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { status }: any = req.query;
  if (status === undefined) status = false;
  console.log(status);
  try {
    const disabledGame = await GameModel.findByIdAndUpdate(id, {
      active: status,
    });

    res.send(`The game was ${status ? "active" : "disabled"}`);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedGame = await GameModel.findByIdAndDelete(id);
    res.send("The game was permanently removed");
  } catch (error) {
    res.status(404).send(error);
  }
};

export const featuredGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { featured } = req.query;
  if (featured === undefined) featured = "false";
  try {
    const game = await GameModel.findByIdAndUpdate(id, {
      featured,
    });
    if (!game) res.status(404).send("The game is null");
    res.send(await GameModel.findById(`${game?._id}`));
  } catch (error) {
    res.status(404).send(error);
  }
};

export const isNewGame = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { isNew } = req.query;
  if (isNew === undefined) isNew = "false";
  try {
    const game = await GameModel.findByIdAndUpdate(id, {
      is_new: isNew,
    });
    if (!game) res.status(404).send("The game is null");
    res.send(await GameModel.findById(`${game?._id}`));
    // paranoid: false
  } catch (error) {
    res.status(404).send(error);
  }
};

export const postGame = async (req: Request, res: Response) => {
  const bodyGame = req.body;
  try {
    const game = await GameModel.findOne({ name: bodyGame.name });
    if (game) return res.status(400).send(`This game already exists`);
    const createdGame = await GameModel.create({
      name: bodyGame.name,
      description: bodyGame.description,
      released: bodyGame.released,
      main_image: bodyGame.main_image,
      short_screenshots: bodyGame.short_screenshots,
      rating: bodyGame.rating,
      price: Number(bodyGame.price),
      on_sale: Number(bodyGame.on_sale),
      stock: Number(bodyGame.stock),
      featured: bodyGame.featured ? true : false,
      is_new: bodyGame.is_new ? true : false,
      platforms: bodyGame.platforms,
      genres: bodyGame.genres,
      tags: bodyGame.tags,
    });

    res.status(201).send(`The game was created successfully!`);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const putGame = async (req: Request, res: Response) => {
  const bodyGame = req.body;
  try {
    const updatedGame = await GameModel.findByIdAndUpdate(
      bodyGame._id,
      bodyGame
    );

    if (!updatedGame) {
      return res
        .status(400)
        .send(`The game could not be modified successfully`);
    }
    res.send("The game was modified successfully");
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
          active: g.stock > 0 ? true : false,
        });
      });
      console.log("🟢 Loading of games complete. 🟢");
    }
  } catch (error) {
    console.log(`Load Data Base: ${error}`);
  }
};
