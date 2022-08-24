import { User } from "../models/User.js";
import { Game } from "../models/Game.js";

export const getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: 'cart'
    })
    if(!user) { res.status(400).send(`Error, route <Get, GetCart>: User not found`); };
    
    res.send(user);
  } catch (error) {
    res.status(404).send(`Error, route <Get, GetCart>: ${error}`);
  }
};

export const addCart = async (req, res) => {
  const { id } = req.params;
  const { gameId } = req.query;

  try {
    const user = await User.findByPk(id);
    const game = await Game.findByPk(gameId);
    if (!user || !game) {
      return res
        .status(400)
        .send(`Error, route <Add, AddCart>: User not found `);
    }
    user.addCart(game);
    res.send('The game was added to the cart')
  } catch (error) {
    res.status(404).send(`Error, route <Add, AddCart>: ${error}`);
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  const { gameId } = req.query;

  try {
    const user = await User.findByPk(id);
    const game = await Game.findByPk(gameId);
    if (!user || !game) {
      return res
        .status(400)
        .send(`Error, route <Delete, DeleteCart>: User not found `);
    }
    user.removeCart(game);
    res.send(`The game was removed from the cart`);
  } catch (error) {
    res.status(404).send(`Error, route <Delete, DeleteCart>: ${error}`);
  }
};
