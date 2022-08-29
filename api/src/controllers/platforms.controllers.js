import { Platforms } from './../lib/enums/index.js';

export const getPlatforms = async (req, res) => {
    res.send(Platforms);
}; 