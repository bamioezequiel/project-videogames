import { User } from "../models/User.js";
import { Game } from "../models/Game.js";

export const getFavorites = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: 'favorites'
    })
    if(!user) { res.status(400).send(`Error, route <Get, GetFavorites>: User not found`); };
    
    res.send(user.dataValues.favorites);
  } catch (error) {
    res.status(404).send(`Error, route <Get, GetFavorites>: ${error}`);
  }
};

export const addFavorites = async (req, res) => {
  const { id } = req.params;
  const { gameId } = req.query;

  try {
    const user = await User.findByPk(id);
    const game = await Game.findByPk(gameId);
    if (!user || !game) {
      return res
        .status(400)
        .send(`Error, route <Add, AddFavorites>: User not found `);
    }
    user.addFavorites(game);
    await user.save();
    const rtnUser = await User.findByPk(id, {
      include: 'favorites'
    });
    res.send(rtnUser.dataValues.favorites);
  } catch (error) {
    res.status(404).send(`Error, route <Add, AddFavorites>: ${error}`);
  }
};

export const deleteFavorites = async (req, res) => {
  const { id, gameId } = req.params;

  try {
    const user = await User.findByPk(id);
    const game = await Game.findByPk(gameId);
    if (!user || !game) {
      return res
        .status(400)
        .send(`Error, route <Delete, DeleteFavorites>: User not found `);
    }
    user.removeFavorites(game);
    await user.save();
    const rtnUser = await User.findByPk(id, {
      include: 'favorites'
    });
    res.send(rtnUser.dataValues.favorites);
  } catch (error) {
    res.status(404).send(`Error, route <Delete, DeleteFavorites>: ${error}`);
  }
};
