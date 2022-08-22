import { Router } from "express";
import { deleteGame, getAllGames, getGamesById, postGame, putGame, restoreGame } from "../controllers/games.controllers";
const router = Router();

router.get('/', getAllGames);
router.post('/', postGame);
router.put('/', putGame);
router.get('/:id', getGamesById);
router.delete('/:id', deleteGame);
router.patch('/:id', restoreGame);

export default router;

/* let games = await axios.get(
    "https://api.rawg.io/api/games?key=6de51b3aabbb48349ae0f7d88c117d0d&page=5"
  );

  let arrGames = games.data.results.map((p: any) => ({
    id: p.id,
    name: p.name,
    released: p.released,
    main_image: p.background_image,
    short_screenshots: p.short_screenshots.map((s: any) => s.image),
    rating: p.rating,
    price: Math.floor(Math.random() * 1000),
    on_sale: 0,
    stock: 1,
    features: p.rating > 4,
    is_new: false,
    saturated_color: p.saturated_color,
    dominant_color: p.dominant_color,
    platforms: p.platforms.map((el: any) => el.platform.name),
    genres: p.genres.map((el: any) => el.name),
    tags: p.tags.map((el: any) => el.name),
  }));

  console.log(arrGames.length); */
