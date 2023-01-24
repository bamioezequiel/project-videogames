import { Request, Response } from 'express';
import { Genres, Platforms, Tags } from '../data/categories';

export const getPlatforms = (req: Request, res: Response) => {
    res.send(Platforms);
}; 
export const getGenres = (req: Request, res: Response) => {
    res.send(Genres);
}; 
export const getTags = (req: Request, res: Response) => {
    res.send(Tags);
}; 