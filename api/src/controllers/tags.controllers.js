import { Tags } from './../lib/enums/index.js';

export const getTags = async (req, res) => {
    res.send(Tags);
}; 