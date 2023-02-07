import { Request, Response } from "express";
import { Game } from "../interfaces/game.interface";
import CartModel from "../models/cart.model";
import { getGames } from "./../services/game.service";

export const changeStatusCart = async (userId: string, status: string) => {
  return await CartModel.findByIdAndUpdate(
    {
      userId,
      status: "processed",
    },
    { status }
  );
};

export const getAllCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let carts = await CartModel.find({
      userId: id,
    });
    if (!carts) res.status(400).send('The user has not carts');

    res.send(carts);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let cart = await CartModel.findOne({
      userId: id,
      status: "processed",
    });
    if (!cart) cart = await CartModel.create({ userId: id });

    res.send(cart);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const addGameInCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { gameId } = req.query;
  //preguntar si existe el usuario
  try {
    let cart: any = await CartModel.findOne({
      userId: id,
      status: "processed",
    });
    if (!cart) cart = await CartModel.create({ userId: id });
    const game: any = await getGames("true", `${gameId}`);

    const notGame = cart.cart?.every(
      (el: Game) => el._id?.toString() !== game._id?.toString()
    );

    if (!notGame)
      return res.status(400).send("The game is already in the Cart");

    const priceTotal = game.on_sale > 0 ? game.price_with_sale : game.price

    await CartModel.findByIdAndUpdate(cart._id, {
      cart: [...cart.cart, game],
      total: cart.total + priceTotal,
    });
    const cartUpdated = await CartModel.find({
      userId: id,
      status: "processed",
    });

    res.send(cartUpdated);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const removeGamesFromCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { gameId } = req.query;
  //preguntar si existe el usuario
  try {
    let cart: any = await CartModel.findOne({
      userId: id,
      status: "processed",
    });
    if (!gameId) {
      await CartModel.findByIdAndUpdate(cart._id, {
        cart: [],
        total: 0,
      });
      return res.send("The cart is empty");
    }

    const game: any = await getGames("true", `${gameId}`);

    const notGame = cart.cart?.some(
      (el: Game) => el._id?.toString() === game._id?.toString()
    );

    if (!notGame) return res.status(400).send("The game is not in the Cart");

    const priceTotal = game.on_sale > 0 ? game.price_with_sale : game.price

    await CartModel.findByIdAndUpdate(cart._id, {
      cart: cart.cart.filter(
        (el: Game) => el._id?.toString() !== game._id?.toString()
      ),
      total: cart.total - priceTotal,
    });
    const cartUpdated = await CartModel.find({
      userId: id,
      status: "processed",
    });

    res.send(cartUpdated);
  } catch (error) {
    res.status(404).send(error);
  }
};
