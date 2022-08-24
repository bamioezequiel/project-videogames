import { Action } from "../../interfaces/Action.interface";
import { AXIOS_ERROR, AXIOS_START, GET_ALL_GAMES } from "../actions";

const initialState = {
  allGames: [],
  filteredGames: [],
  loading: false,
  error: null,
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case AXIOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case AXIOS_START:
      return {
        ...state,
        loading: true,
        [action.state]: action.payload,
      };
    case GET_ALL_GAMES:
      return {
        ...state,
        loading: false,
        error: null,
        allGames: action.payload,
        filteredGames: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
