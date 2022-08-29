import { Genres } from './../lib/enums/index.js';

export const getGenres = async (req, res) => {
    res.send(Genres);
}; 