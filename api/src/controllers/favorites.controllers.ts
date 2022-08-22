import { Response, Request } from "express";

export const getFavorites = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(404).send(`Error, route <Get, >: ${error}`)
    }
}

export const addFavorites = async (req: Request, res: Response) => {
    try {
        
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