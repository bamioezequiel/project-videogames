import { Response, Request } from "express";
import { Game } from "./../db";
import { dataGames } from "./../data/games";

export const getAllGames = async (req: Request, res: Response) =>{
    try {
        const allGames = await Game.findAll();
        res.send(allGames);
    } catch (error) {
        res.status(404).send(`Error, route <Get, AllGames>: ${error}`)
    }
}

export const getGamesById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const game = await Game.findByPk(id);
        res.send(game);
    } catch (error) {
        res.status(404).send(`Error, route <Get, GamesById>: ${error}`)
    }
}

export const deleteGame = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedGame = await Game.findByPk(id);
        if(deletedGame) {
            await Game.destroy({
                where: {
                    id
                }
            });
            res.send( deletedGame ? 'The game was successfully deleted.' 
                                  : 'The game is already deleted.');
        }
    } catch (error) {
        res.status(404).send(`Error, route <Delete, DeleteGame>: ${error}`)
    }
}

export const restoreGame = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Game.restore({
            where: {
                id
            }
        });
        res.send('The game was restored successfully')
    } catch (error) {
        res.status(404).send(`Error, route <Restore, RestoreGame>: ${error}`)
    }
}

export const postGame = async (req: Request, res: Response) => {
    const bodyGame = req.body;
    try {
        const createdGame = await Game.findOrCreate({
            where: {
                name: bodyGame.name
            },
            defaults: {
                released: bodyGame.released,
                main_image: bodyGame.main_image,
                short_screenshots: bodyGame.short_screenshots,
                rating: bodyGame.rating,
                price: bodyGame.price,
                on_sale: bodyGame.on_sale,
                stock: bodyGame.stock,
                features: bodyGame.features,
                is_new: bodyGame.is_new,
                saturated_color: bodyGame.saturated_color,
                dominant_color: bodyGame.dominant_color,
                platforms: bodyGame.platforms,
                genres: bodyGame.genres,
                tags: bodyGame.tags
            }
        });
        if(!createdGame[1]) { return res.status(400).send(`Error, route <Post, PostGames>: This game already exists`); }
        res.status(201).send(`The game was created successfully!`)
    } catch (error) {
        res.status(404).send(`Error, route <Post, PostGames>: ${error}`)
    }
}

export const putGame = async (req: Request, res: Response) => {
    const bodyGame = req.body;
    try {
        const updatedGame = await Game.update(bodyGame, {
            where: {
                id: bodyGame.id
            }
        }) 
        if(Number(updatedGame) === 0) {
            return res.status(400).send(`Error, route <Put, PutGame>: The game could not be modified successfully`);
        }
        res.send('The game was modified successfully') 
    } catch (error) {
        res.status(404).send(`Error, route <Put, PutGame>: ${error}`)
    }
}

export const loadGames = async () => {
  try {
    if (!(await Game.findAndCountAll())?.count) {
      console.log("Loading games in database...");
      dataGames?.map(async (g: any) => {
        await Game.findOrCreate({
          where: {
            ...g,
          },
        });
      });
      console.log("Loading of games complete.");
    }
  } catch (error) {
    console.log(`Load Data Base: ${error}`);
  }
};
