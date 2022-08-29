import Axios from "axios";
import axios from "axios";
export const AXIOS_ERROR = "AXIOS_ERROR";
export const AXIOS_START = "AXIOS_START";
export const GET_DETAIL_GAME = "GET_DETAIL_GAME";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const GET_FILTERED_GAMES = "GET_FILTERED_GAMES";
export const GET_FILTERED_FEATURED_GAMES = "GET_FILTERED_FEATURED_GAMES";
export const GET_FILTERED_NEW_GAMES = "GET_FILTERED_NEW_GAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_TAGS = "GET_TAGS";
export const GET_FAVORITES_LOCAL_STORAGE = "GET_FAVORITES_LOCAL_STORAGE";
export const GET_USER = "GET_USER";
export const POST_USER = "POST_USER";
// export const ORDER_BY_PRICE = 'ORDER_BY_PRICE';

export const getFavoritesLocalStorage = () => {
  return async function (dispatch: Function) {
    try {
      await dispatch(axiosStart("favoritesLS", []));
      const res = JSON.parse(localStorage.getItem("favorites") || '[]');
      return dispatch({ type: GET_FAVORITES_LOCAL_STORAGE, payload: res });
    } catch (error) {
      await dispatch(axiosError(error as Error));
      console.log(`Error, actions <GetFavoritesLocalStorage>: ${error}`);
    }
  };
};

export const getTags = () => {
  return async function (dispatch: Function) {
    try {
      await dispatch(axiosStart("tags", []));
      const res = await axios.get(`http://localhost:3001/tags`);
      return dispatch({ type: GET_TAGS, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error as Error));
      console.log(`Error, actions <GetTags>: ${error}`);
    }
  };
};

export const getPlatforms = () => {
  return async function (dispatch: Function) {
    try {
      await dispatch(axiosStart("platforms", []));
      const res = await axios.get(`http://localhost:3001/platforms`);
      return dispatch({ type: GET_PLATFORMS, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error as Error));
      console.log(`Error, actions <GetPlatforms>: ${error}`);
    }
  };
};

export const getGenres = () => {
  return async function (dispatch: Function) {
    try {
      await dispatch(axiosStart("genres", []));
      const res = await axios.get(`http://localhost:3001/genres`);
      return dispatch({ type: GET_GENRES, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error as Error));
      console.log(`Error, actions <GetGenres>: ${error}`);
    }
  };
};

export const getLogoutUser = () => {
  return async function (dispatch: Function) {
    try {
      await dispatch(axiosStart("user", {}));
      const res = await Axios.get(`http://localhost:3001/auth/logout`, {
        //arreglar logout no deslogea
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      await dispatch(axiosError(error as Error));
      console.log(`Error, actions <LogoutUser>: ${error}`);
    }
  };
};

export const getLoginMeUser = () => {
  return async function (dispatch: Function) {
    try {
      let res = await Axios.get(`http://localhost:3001/auth/isAuth`, {
        withCredentials: true,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      await dispatch(axiosError(error as Error));
      console.log(`Error, actions <isAuthUser>: ${error}`);
    }
  };
};

export const postLoginUserWithGoogle = () => {
  return async function (dispatch: Function) {
    try {
      await dispatch(axiosStart("user", {}));
      let res = await Axios.post(`http://localhost:3001/auth/google`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      await dispatch(axiosError(error as Error));
      console.log(`Error, actions <LoginUser>: ${error}`);
    }
  };
};

export const postLoginUser = (user: any) => {
  return async function (dispatch: Function) {
    try {
      await dispatch(axiosStart("user", {}));
      let res = await Axios.post(`http://localhost:3001/auth/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: user.email,
          password: user.password,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      await dispatch(axiosError(error as Error));
      console.log(`Error, actions <LoginUser>: ${error}`);
    }
  };
};

export const postUser = (user: any) => {
  return async function (dispatch: Function) {
    try {
      await dispatch(axiosStart("user", {}));
      let res = await axios.post(`http://localhost:3001/users`, user);
      return dispatch({ type: POST_USER, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error as Error));
      console.log(`Error, actions <PostUser>: ${error}`);
    }
  };
};

export const getUser = (id: any) => {
  return async function (dispatch: Function) {
    try {
      await dispatch(axiosStart("user", {}));
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
      dispatch(axiosStart("detailGame"));
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
      dispatch(axiosStart("allVideogames"));
      let res = await axios.get("http://localhost:3001/games");
      return dispatch({ type: GET_ALL_GAMES, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error as Error));
      console.log(`Error, actions <GetAllGames>: ${error}`);
    }
  };
};

export const getFilteredFeaturedGames = () => {
  return async function (dispatch: Function) {
    try {
      dispatch(axiosStart("filteredGames"));
      let res = await axios.get(`http://localhost:3001/filters?featured=true`);
      return dispatch({ type: GET_FILTERED_FEATURED_GAMES, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error as Error));
      console.log(`Error, actions <getFilteredGames>: ${error}`);
    }
  };
};

export const getFilteredNewGames = () => {
  return async function (dispatch: Function) {
    try {
      dispatch(axiosStart("filteredGames"));
      let res = await axios.get(`http://localhost:3001/filters?is_new=true`);
      return dispatch({ type: GET_FILTERED_NEW_GAMES, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error as Error));
      console.log(`Error, actions <getFilteredGames>: ${error}`);
    }
  };
};

// s, featured, is_new, platform, tag, genres, rating, order(asc, desc, min, max), amount
// filter: tag, filterGames: [{...}...], payload: Singleplayer

export const getFilteredGames = (
  filter: any,
  filterGames: any,
  payload: any
) => {
  return async function (dispatch: Function) {
    try {
      dispatch(axiosStart("filteredGames"));
      let res = await axios.get(
        `http://localhost:3001/filters?${filter}=${payload}`,
        filterGames
      );
      return dispatch({ type: GET_FILTERED_GAMES, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error as Error));
      console.log(`Error, actions <getFilteredGames>: ${error}`);
    }
  };
};

export const axiosError = (error: Error) => {
  return { type: AXIOS_ERROR, payload: error };
};

export const axiosStart = (state: string, value?: any) => {
  return { type: AXIOS_START, payload: !value ? [] : value, state: state };
};

// export function orderByPrice(payload : any) {
//   return {
//     type: "ORDER_BY_PRICE",
//     payload,
//   };
// }
