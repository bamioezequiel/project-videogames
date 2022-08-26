import axios from "axios";
export const AXIOS_ERROR = "AXIOS_ERROR";
export const AXIOS_START = "AXIOS_START";
export const GET_DETAIL_GAME = "GET_DETAIL_GAME";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_FILTERED_GAMES = 'GET_FILTERED_GAMES';
export const GET_FILTERED_FEATURED_GAMES = 'GET_FILTERED_FEATURED_GAMES';
export const GET_FILTERED_NEW_GAMES = 'GET_FILTERED_NEW_GAMES';
export const GET_USER = 'GET_USER';
// export const ORDER_BY_PRICE = 'ORDER_BY_PRICE';

export const axiosError = (error: Error) => {
  return { type: AXIOS_ERROR, payload: error };
};

export const axiosStart = (state: string, value?: any, ) => {
  return { type: AXIOS_START, payload: (!value) ? [] : value, state: state};
};

export const getUser = (id: any) => {
  return async function (dispatch: Function) {
    try {
      await dispatch(axiosStart('user', {}));
      console.log(id)
      let res = await axios.get(`http://localhost:3001/users/${id}`);
      return dispatch({ type: GET_USER, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error as Error));
      console.log(`Error, actions <GetUser>: ${error}`);
    }
  };
};

export const getDetailGame = (id: any) => {
  return async function (dispatch: Function) {
    try {
      dispatch(axiosStart('detailGame'));
      let res = await axios.get(`http://localhost:3001/games/${id}`);
      return dispatch({ type: GET_DETAIL_GAME, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error as Error));
      console.log(`Error, actions <GetDetailGames>: ${error}`);
    }
  };
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

export const getFilteredFeaturedGames = () => {
  return async function (dispatch : Function) {
    try{
      dispatch(axiosStart('filteredGames'));
      let res = await axios.get(`http://localhost:3001/filters?featured=true`);
      return dispatch({ type: GET_FILTERED_FEATURED_GAMES, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error as Error));
      console.log(`Error, actions <getFilteredGames>: ${error}`);
    }
  }
}

export const getFilteredNewGames = () => {
  return async function (dispatch : Function) {
    try{
      dispatch(axiosStart('filteredGames'));
      let res = await axios.get(`http://localhost:3001/filters?is_new=true`);
      return dispatch({ type: GET_FILTERED_NEW_GAMES, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error as Error));
      console.log(`Error, actions <getFilteredGames>: ${error}`);
    }
  }
}

// s, featured, is_new, platform, tag, genres, rating, order(asc, desc, min, max), amount
// filter: tag, filterGames: [{...}...], payload: Singleplayer

export const getFilteredGames = (filter: any, filterGames: any, payload: any) => {
  return async function (dispatch : Function) {
    try{
      dispatch(axiosStart('filteredGames'));
      let res = await axios.get(`http://localhost:3001/filters?${filter}=${payload}`, filterGames);
      return dispatch({ type: GET_FILTERED_GAMES, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error as Error));
      console.log(`Error, actions <getFilteredGames>: ${error}`);
    }
  }
}

// export function orderByPrice(payload : any) {
//   return {
//     type: "ORDER_BY_PRICE",
//     payload,
//   };
// }