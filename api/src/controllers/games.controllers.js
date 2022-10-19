import { Game } from "../models/Game.js";
import { dataGames } from "../lib/data/games.js";
import axios from "axios";

export const getAllGames = async (req, res) => {
  const { active } = req.query;
  try {
    if(active === 'true') {
      const games = await Game.findAll({
        where: {
          active: true,
        },
      });
  
      res.send(games);
    } else {
      const allGames = await Game.findAll({
        paranoid: false,
      });
      res.send(allGames);
    }
  } catch (error) {
    res.status(404).send(`Error, route <Get, AllGames>: ${error}`);
  }
};

export const getGamesById = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findOne({
      where: {
        id
      },
      paranoid: false,
    });
    res.send(game);
  } catch (error) {
    res.status(404).send(`Error, route <Get, GamesById>: ${error}`);
  }
};

export const deleteGame = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGame = await Game.findByPk(id);
    if (deletedGame) {
      let res = await Game.destroy({
        where: {
          id,
        },
      });
      if (res === 0)
        return res.status(404).send("The game is already deleted.");
      deletedGame.active = false;
      await deletedGame.save();
      res.send(
        await Game.findAll({
          paranoid: false,
        })
      );
    }
  } catch (error) {
    res.status(404).send(`Error, route <Delete, DeleteGame>: ${error}`);
  }
};

export const featuredGame = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findByPk(id);
    game.featured = !game.featured ;
    game.save();
    res.send(
      await Game.findAll({
        paranoid: false,
      })
    );
  } catch (error) {
    res.status(404).send(`Error, route <Featured, FeaturedGame>: ${error}`);
  }
};

export const isNewGame = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await Game.findByPk(id);
    game.is_new = !game.is_new ;
    game.save();
    res.send(
      await Game.findAll({
        paranoid: false,
      })
    );
  } catch (error) {
    res.status(404).send(`Error, route <IsNew, IsNewGame>: ${error}`);
  }
};

export const restoreGame = async (req, res) => {
  const { id } = req.params;
  try {
    await Game.restore({
      where: {
        id,
      },
    });
    const game = await Game.findByPk(id);
    game.active = true;
    game.save();
    res.send(
      await Game.findAll({
        paranoid: false,
      })
    );
  } catch (error) {
    res.status(404).send(`Error, route <Restore, RestoreGame>: ${error}`);
  }
};

export const postGame = async (req, res) => {
  const bodyGame = req.body;
  try {
    const createdGame = await Game.findOrCreate({
      where: {
        name: bodyGame.name,
      },
      defaults: {
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
      },
    });
    if (!createdGame[1]) {
      return res
        .status(400)
        .send(`Error, route <Post, PostGames>: This game already exists`);
    }
    res.status(201).send(`The game was created successfully!`);
  } catch (error) {
    res.status(404).send(`Error, route <Post, PostGames>: ${error}`);
  }
};

export const putGame = async (req, res) => {
  const bodyGame = req.body;
  try {
    const updatedGame = await Game.update(bodyGame, {
      where: {
        id: bodyGame.id,
      },
    });
    if (Number(updatedGame) === 0) {
      return res
        .status(400)
        .send(
          `Error, route <Put, PutGame>: The game could not be modified successfully`
        );
    }
    res.send("The game was modified successfully");
  } catch (error) {
    res.status(404).send(`Error, route <Put, PutGame>: ${error}`);
  }
};

export const loadGames = async () => {
  try {
    if (!(await Game.findAndCountAll())?.count) {
      console.log("Loading games in database...");
      dataGames?.map(async (g) => {
        await Game.findOrCreate({
          where: {
            ...g,
            featured: g.rating > 4.5 ? true : false,
            active: g.stock > 0 ? true : false,
          },
        });
      });
      console.log("Loading of games complete.");
    }
  } catch (error) {
    console.log(`Load Data Base: ${error}`);
  }
};
