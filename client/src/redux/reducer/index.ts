import { GET_ALL_GAMES } from "../actions";

const initialState = {
    allGames: [],
    filteredGames: [],
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ALL_GAMES:
      return {
        ...state,
        allGames: action.payload,
        filteredGames: action.payload
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
