import axios from "axios";
export const GET_ALL_GAMES = "GET_ALL_GAMES";

export const getAllGames: any = () => {
  try {
    return async function (dispatch: any)  {
      let res = await axios.get("http://localhost:3001/games");
      return dispatch({ type: GET_ALL_GAMES, payload: res.data });
    };
  } catch (error) {
    console.log(`Error, actions <GetAllGames>: ${error}`);
  }
};
