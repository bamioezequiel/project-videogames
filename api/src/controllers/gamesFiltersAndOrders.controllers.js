import { Game } from "../models/Game.js";

export const getGamesFiltered = async (req, res) => {
  const { s, featured, is_new, platform, tag, genres, rating, order, amount } = req.query;
  
  try {
    let gameFiltered = await Game.findAll();
    if (featured) {
      gameFiltered = gameFiltered.filter((g) => g.featured == true);
    }
    if (is_new) {
      gameFiltered = gameFiltered.filter((g) => g.is_new == true);
    }
    if (tag?.length > 0) {
      gameFiltered = gameFiltered.filter((g) => g.tags.includes(tag));
    }
    if (genres?.length > 0) {
      gameFiltered = gameFiltered.filter((g) => g.genres.includes(genres));
    }
    if (platform?.length > 0) {
      gameFiltered = gameFiltered.filter((g) => g.platforms.includes(platform));
    }
    if (Number(rating) > 0) {
      gameFiltered = gameFiltered.filter((g) => g.rating === Number(rating));
    }
    if (order?.length > 0) {
      switch (order) {
        case "asc":
          gameFiltered.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          );
          break;
        case "desc":
          gameFiltered.sort((a, b) =>
            b.name.toLowerCase().localeCompare(a.name.toLowerCase())
          );
          break;
        case "min":
          gameFiltered.sort((a, b) => a.price - b.price);
          break;
        case "max":
          gameFiltered.sort((a, b) => b.price - a.price);
          break;
      }
    }
    if (Number(amount) > 0) {
      (Number(amount) !== 25 && Number(amount) !== 50)
        ? (gameFiltered = gameFiltered.slice(0, 12))
        : (gameFiltered = gameFiltered.slice(0, Number(amount)));
    }
    if (s?.length > 0) {
      gameFiltered = gameFiltered.filter(
        (g) =>
          g.name.toLowerCase().includes(s.toLowerCase()) ||
          g.description.toLowerCase().includes(s.toLowerCase())
      );
    }
    console.log(gameFiltered.length)
    res.send(gameFiltered);
  } catch (error) {
    res.status(404).send(`Error, route <Get, GetGamesFiltered>: ${error}`);
  }
};
