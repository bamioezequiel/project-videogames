import { Response, Request } from "express";
import { Game } from "../db";

export const getFavorites = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(404).send(`Error, route <Get, >: ${error}`)
    }
}

export const addFavorites = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.query;
    try {
        /* const game = await Game.findByPk(id);
        const user = await Game.findOne({
            where: {
                id: userId
            }
        });
        if(user) {
            user.favs.push(game)
            return res.status(200).send('Added to favourite successfully')
        } */
        res.status(400).send(`Error, route <Add, AddFavorites>: Login required`);
    } catch (error) {
        res.status(404).send(`Error, route <Add, >: ${error}`)
    }
}

export const deleteFavorites = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(404).send(`Error, route <Delete, >: ${error}`)
    }
}