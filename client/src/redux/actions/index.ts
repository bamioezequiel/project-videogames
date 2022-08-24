import axios from "axios";
export const AXIOS_ERROR = "AXIOS_ERROR";
export const AXIOS_START = "AXIOS_START";
export const GET_ALL_GAMES = "GET_ALL_GAMES";

export const axiosError = (error: Error) => {
  return { type: AXIOS_ERROR, payload: error };
};

export const axiosStart = (state: string) => {
  return { type: AXIOS_START, state: state};
};

export const getAllGames = () => {
  return async function (dispatch: Function) {
    try {
      dispatch(axiosStart('allVideogames'));
      let res = await axios.get("http://localhost:3001/games");
      return dispatch({ type: GET_ALL_GAMES, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error as Error));
      console.log(`Error, actions <GetAllGames>: ${error}`);
    }
  };
};
