import { Response, Request } from "express";

export const getCart = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(404).send(`Error, route <Get, >: ${error}`)
    }
}

export const getDeleteCart = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(404).send(`Error, route <Get, >: ${error}`)
    }
}

export const addCart = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(404).send(`Error, route <Add, >: ${error}`)
    }
}

export const deleteCart = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(404).send(`Error, route <Delete, >: ${error}`)
    }
}