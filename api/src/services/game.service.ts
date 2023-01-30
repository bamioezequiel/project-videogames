import { Game } from "../interfaces/game.interface";
import GameModel from "../models/game.model";

export const getGames = async (active: string, id?: string | null) => {
  if (id) {
    const game = await GameModel.findById(id);
    //paranoid: false
    if (!game) throw new Error("The game not found");
    return game;
  } else {
    if (active === "true") {
      const games = await GameModel.find({
        active: true,
      });

      return games;
    } else {
      const allGames = await GameModel.find();

      return allGames;
    }
  }
};

export const updateStatusGame = async (id: string, status: boolean) => {
  return await GameModel.findByIdAndUpdate(id, {
    active: status,
  });
};

export const deletePermanentlyGame = async (id: string) => {
  return await GameModel.findByIdAndDelete(id);
};

export const patchGame = async (id: string, action: string, value: boolean) => {
  const game = await GameModel.findByIdAndUpdate(id, {
    [action]: value,
  });
  if (!game) throw new Error("The game is null");
  return await GameModel.findById(`${game?._id}`);
};

export const createGame = async (bodyGame: Game) => {
  const game = await GameModel.findOne({ name: bodyGame.name });
  if (game) throw new Error(`This game already exists`);
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

  return `The game was created successfully!`;
};

export const updateGame = async (bodyGame: any) => {
  const updatedGame = await GameModel.findByIdAndUpdate(bodyGame._id, bodyGame);

  if (!updatedGame) {
    throw new Error(`The game could not be modified successfully`);
  }
  return "The game was modified successfully";
};
