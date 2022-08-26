import { Action } from "../../interfaces/Action.interface";
import { AXIOS_ERROR, AXIOS_START, GET_ALL_GAMES, GET_DETAIL_GAME, GET_FILTERED_FEATURED_GAMES, GET_FILTERED_NEW_GAMES, GET_USER } from "../actions";

const initialState = {
  allGames: [],
  filteredGames: [],
  filteredFeaturedGames: [],
  filteredNewGames: [],
  detailGame: {},
  user: {},
  loading: false,
  error: null,
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case GET_DETAIL_GAME:
      return {
        ...state,
        loading: false,
        error: null,
        detailGame: action.payload,
      };
    case GET_ALL_GAMES:
      return {
        ...state,
        loading: false,
        error: null,
        allGames: action.payload,
        filteredGames: action.payload,
      };
    case GET_FILTERED_FEATURED_GAMES:
      return {
        ...state,
        loading: false,
        error: null,
        filteredFeaturedGames: action.payload,
      };
    case GET_FILTERED_NEW_GAMES:
      return {
        ...state,
        loading: false,
        error: null,
        filteredNewGames: action.payload,
      };
    case AXIOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AXIOS_START:
      return {
        ...state,
        loading: true,
        [action.state]: action.payload,
      };
      // case ORDER_BY_PRICE:
      //   let sortPrice =
      //     action.payload === "minPrice"
      //       ? state.filteredGames.sort(function (a, b) {
      //           if (a.price > b.price) return 1;
      //           if (b.price > a.price) return -1;
      //           return 0;
      //         })
      //       : state.filteredGames.sort(function (a, b) {
      //           if (a.price > b.price) return -1;
      //           if (b.price > a.price) return 1;
      //           return 0;
      //         });
       
      //   return {
      //     ...state,
      //     filteredGames: sortPrice,
      //   };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
