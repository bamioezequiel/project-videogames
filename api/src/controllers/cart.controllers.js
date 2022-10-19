// import { User } from "../models/User.js";
import { Game } from "../models/Game.js";
// import { Order } from "../models/Order.js";
import { Cart } from "../models/Cart.js";
import { Op } from "sequelize";

export const statusCart = async (id, status) => {
  await Cart.update( { status }, { where: { id } })
};

export const addItemCart = async (req, res, next) => {
  const { id, gameId } = req.params;

  try {
    const game = await Game.findByPk(gameId);
    let userCart = await Cart.findOne({
      where: {
        userId: id,
        status: {
          [Op.or]: ["Empty", "In process"],
        },
      },
    });
    if (!userCart) {
      await Cart.create({
        status: "Empty",
        userId: id,
      });
      userCart = await Cart.findOne({
        where: {
          userId: id,
          status: {
            [Op.or]: ["Empty", "In process"],
          },
        },
      });
    }

    const arrCart = userCart.dataValues.cart;
    for (let i = 0; i < arrCart.length; i++) {
      if (arrCart[i] == gameId) {
        return res
          .status(400)
          .send(
            `Error, route <Add, AddItemCart>: The game is already in the cart`
          );
      }
    }

    await userCart.update({
      status: "In process",
      cart: [...userCart.dataValues.cart, game.id],
      price:
        userCart.dataValues.price +
        (game.on_sale === 0
          ? game.price
          : game.price - (game.price * game.on_sale) / 100),
    });
    await userCart.save();

    res.send(await getCart(req, res));
  } catch (error) {
    res.status(404).send(`Error, route <Add, AddItemCart>: ${error}`);
  }
};

export const getCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findOne({
      where: {
        userId: id,
        status: {
          [Op.or]: ["Empty", "In process"],
        },
      },
    });
    if (!cart) {
      return res
        .status(400)
        .send(`Error, route <Get, GetCart>: The user does not have a cart`);
    }

    cart.cart = await Game.findAll({
      where: {
        id: cart.cart,
      },
    });

    res.send(cart);
  } catch (error) {
    res.status(404).send(`Error, route <Get, GetCart>: ${error}`);
  }
};

export const deleteItemCart = async (req, res) => {
  const { id, gameId } = req.params;
  try {
    const game = await Game.findByPk(gameId);
    let userCart = await Cart.findOne({
      where: {
        userId: id,
        status: "In process",
      },
    });
    if (!userCart)
      return res
        .status(400)
        .send(
          `Error, route <Delete, DeleteItemCart>: This user does not have a cart`
        );
    /* const arrCart = userCart.dataValues.cart;
    for(let i = 0; i < arrCart.length; i++) {
      if(arrCart[i].id == gameId) {
        return res.status(400).send(`Error, route <Delete, DeleteItemCart>: This game is not in the cart`);
      }
    } */
    if (!userCart.dataValues.cart.includes(game.id)) {
      return res
        .status(400)
        .send(
          `Error, route <Delete, DeleteItemCart>: This game is not in the cart`
        );
    }
    const filteredGamesInCart = userCart.dataValues.cart.filter(
      (g) => g != game.id
    );
    await userCart.update({
      cart: filteredGamesInCart,
      status: filteredGamesInCart.length === 0 ? "Empty" : "In process",
      price:
        userCart.dataValues.price -
        (game.on_sale === 0
          ? game.price
          : game.price - (game.price * game.on_sale) / 100),
    });
    await userCart.save();
    res.send(await getCart(req, res));
  } catch (error) {
    res.status(404).send(`Error, route <Delete, DeleteItemCart>: ${error}`);
  }
};
