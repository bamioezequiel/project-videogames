import { model, Schema } from "mongoose";
import { Game } from "../interfaces/game.interface";

const GameSchema = new Schema<Game>(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    released: {
      required: true,
      type: String,
    },
    main_image: {
      required: true,
      type: String,
    },
    short_screenshots: {
      required: true,
      type: Array<String>,
      default: []
    },
    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    price_with_sale: {
      type: Number,
      default: 0,
    },
    on_sale: {
      type: Number,
      default: 0,
    },
    stock: {
      required: true,
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    is_new: {
      type: Boolean,
      default: false,
    },
    genres: {
     type: Array<String>,
      default: []
    },
    tags: {
     type: Array<String>,
      default: []
    },
    platforms: {
     type: Array<String>,
      default: []
    },
  },
  {
    versionKey: false,
    timestamps: true,
    /* 
    paranoid: true,
    deletedAt: "deleteAt",
    */
  }
);

const GameModel = model("games", GameSchema);
export default GameModel;
