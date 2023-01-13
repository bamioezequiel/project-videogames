import Axios from "axios";
import axios from "axios";
// --------------- //
export const AXIOS_ERROR = "AXIOS_ERROR";
export const AXIOS_START = "AXIOS_START";
// --------------- //
export const GET_DETAIL_GAME = "GET_DETAIL_GAME";
export const UPDATE_GAME = "UPDATE_GAME";
export const RESTORE_GAME = "RESTORE_GAME";
export const PATCH_FEATURED_GAME = "PATCH_FEATURED_GAME";
export const PATCH_NEW_GAME = "PATCH_NEW_GAME";
export const DELETE_GAME = "DELETE_GAME";
export const POST_GAME = "POST_GAME";
export const GET_GAMES = "GET_GAMES";
export const GET_ALL_GAMES = "GET_ALL_GAMES";
export const FILTERS_GAMES = "FILTERS_GAMES";
export const ORDERS_GAMES = "ORDERS_GAMES";
export const FILTER_SEARCH = "FILTER_SEARCH";
// --------------- //
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_TAGS = "GET_TAGS";
// --------------- //
export const GET_FAVORITES = "GET_FAVORITES";
export const PUT_FAVORITES = "PUT_FAVORITES";
export const DELETE_FAVORITES = "DELETE_FAVORITES";
export const GET_FAVORITES_LOCAL_STORAGE = "GET_FAVORITES_LOCAL_STORAGE";
// --------------- //
export const GET_USER = "GET_USER";
export const GET_ALL_USER = "GET_ALL_USER";
export const GIVE_ADMIN = "GIVE_ADMIN";
export const AUTHENTICATE_STATUS = "AUTHENTICATE_STATUS";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGIN_USER = "LOGIN_USER";
export const UPDATE_USER = "UPDATE_USER";
export const CREATE_USER = "CREATE_USER";
// --------------- //
export const GET_CART_LOCAL_STORAGE = "GET_CART_LOCAL_STORAGE";
export const GET_CART = "GET_CART";
export const DELETE_CART = "DELETE_CART";
export const PUT_CART = "PUT_CART";
// --------------- //

export const Payment = async (cart) => {
    try {
      console.log(cart)
      const res = await axios.post("https://videogames-ezequiel-bamio.onrender.com/payment", cart);
      console.log(res)
      if (res) {
        window.location = res.data.url;
      }
    } catch (error) {
      console.log(error);
    }
};

/* --------------- START CART --------------- */

export const addCart = (id, gameId) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`https://videogames-ezequiel-bamio.onrender.com/cart/${id}/${gameId}`);
      return dispatch({ type: PUT_CART, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(error)
      console.log(`Error, actions <AddCart>: ${error}`);
    }
  };
};

export const removeCart = (id, gameId) => {
  return async function (dispatch) {
    try {
      const res = await axios.delete(
        `https://videogames-ezequiel-bamio.onrender.com/cart/${id}/${gameId}`
      );
      console.log(res);
      return dispatch({ type: DELETE_CART, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(error)
      console.log(`Error, actions <RemoveCart>: ${error}`);
    }
  };
};

export const getCart = (id) => {
  return async function (dispatch) {
    try {
      // await dispatch(axiosStart("cart", {}));
      const res = await axios.get(`https://videogames-ezequiel-bamio.onrender.com/cart/${id}`);
      return dispatch({ type: GET_CART, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(error)
      console.log(`Error, actions <GetCart>: ${error}`);
    }
  };
};

export const cleanCart = () => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("cart", {}));
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <GetCart>: ${error}`);
    }
  };
};

export const getCartLocalStorage = () => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("cartLS", []));
      const res = JSON.parse(localStorage.getItem("cart") || "[]");
      return dispatch({ type: GET_CART_LOCAL_STORAGE, payload: res });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <GetCartLocalStorage>: ${error}`);
    }
  };
};

/* --------------- END CART --------------- */

/* --------------- START FAVORITES --------------- */

export const removeFavorites = (id, gameId) => {
  return async function (dispatch) {
    try {
      const res = await axios.delete(
        `https://videogames-ezequiel-bamio.onrender.com/favorites/${id}/${gameId}`
      );
      console.log(res);
      return dispatch({ type: DELETE_FAVORITES, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(error);
      console.log(`Error, actions <RemoveFavorites>: ${error}`);
    }
  };
}

export const getFavorites = (id) => {
  return async function (dispatch) {
    try {
      // await dispatch(axiosStart("user", {}));
      const res = await axios.get(`https://videogames-ezequiel-bamio.onrender.com/favorites/${id}`);
      return dispatch({ type: GET_FAVORITES, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(error);
      console.log(`Error, actions <GetFavorites>: ${error}`);
    }
  };
}

export const addFavorites = (id, gameId) => {
  return async function (dispatch) {
    try {
      const res = await axios.post(`https://videogames-ezequiel-bamio.onrender.com/favorites/${id}?gameId=${gameId}`);
      return dispatch({ type: PUT_FAVORITES, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(error);
      console.log(`Error, actions <AddFavorites>: ${error}`);
    }
  };
}

export const getFavoritesLocalStorage = () => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("favoritesLS", []));
      const res = JSON.parse(localStorage.getItem("favorites") || "[]");
      return dispatch({ type: GET_FAVORITES_LOCAL_STORAGE, payload: res });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <GetFavoritesLocalStorage>: ${error}`);
    }
  };
};

/* --------------- END FAVORITES --------------- */

/* --------------- START ? --------------- */

export const getTags = () => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("tags", []));
      const res = await axios.get(`https://videogames-ezequiel-bamio.onrender.com/tags`);
      return dispatch({ type: GET_TAGS, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <GetTags>: ${error}`);
    }
  };
};

export const getPlatforms = () => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("platforms", []));
      const res = await axios.get(`https://videogames-ezequiel-bamio.onrender.com/platforms`);
      return dispatch({ type: GET_PLATFORMS, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <GetPlatforms>: ${error}`);
    }
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("genres", []));
      const res = await axios.get(`https://videogames-ezequiel-bamio.onrender.com/genres`);
      return dispatch({ type: GET_GENRES, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <GetGenres>: ${error}`);
    }
  };
};
/* --------------- END ? --------------- */

/* --------------- START USERS --------------- */

export const postLoginUserWithGoogle = () => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("user", {}));
      let res = await Axios.post(`https://videogames-ezequiel-bamio.onrender.com/auth/google`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <LoginUser>: ${error}`);
    }
  };
};

export const removeAdmin = (id, token) => {
  return async function (dispatch) {
    try {
      let res = await axios.patch(
        `https://videogames-ezequiel-bamio.onrender.com/auth/admin/remove/${id}`,
        "",
        {
          headers: {
            token,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <RemoveAdmin>: ${error}`);
    }
  };
};

export const giveAdmin = (id, token) => {
  return async function (dispatch) {
    try {
      let res = await axios.patch(
        `https://videogames-ezequiel-bamio.onrender.com/auth/admin/add/${id}`,
        "",
        {
          headers: {
            token,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <GiveAdmin>: ${error}`);
    }
  };
};

export const authenticateStatus = (token) => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("user", {}));
      let res = await axios.post(`https://videogames-ezequiel-bamio.onrender.com/auth/status`, "", {
        headers: {
          token,
        },
      });
      return dispatch({ type: AUTHENTICATE_STATUS, payload: res.data });
    } catch (error) {
      console.log(error)
      if(error.response.data === 'token expired') localStorage.removeItem("token");
      await dispatch(axiosError(error));
      console.log(`Error, actions <AuthenticateStatus>: ${error}`);
    }
  };
};

export const logoutUser = () => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("user", {}));
      return dispatch({ type: LOGOUT_USER });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <LogoutUser>: ${error}`);
    }
  };
};

export const loginUser = (user) => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("user", {}));
      let res = await Axios.post(`https://videogames-ezequiel-bamio.onrender.com/auth/login`, user);
      alert("Te logueaste correctamente!");
      console.log(res.data);
      return dispatch({ type: LOGIN_USER, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(error);
      console.log(`Error, actions <LoginUser>: ${error}`);
    }
  };
};

export const putUser = (user) => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("user", {}));
      let res = await axios.put(`https://videogames-ezequiel-bamio.onrender.com/users/update`, user);
      return dispatch({ type: UPDATE_USER, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      alert(error.response.data.slice(39))
      console.log(error);
      console.log(`Error, actions <CreateUser>: ${error}`);
    }
  };
};

export const createUser = (user) => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("user", {}));
      let res = await axios.post(`https://videogames-ezequiel-bamio.onrender.com/auth/register`, user);
      
      return dispatch({ type: CREATE_USER, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      alert(error.response.data.slice(39))
      console.log(error);
      console.log(`Error, actions <CreateUser>: ${error}`);
    }
  };
};

export const getUser = (id) => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("user", {}));
      let res = await axios.get(`https://videogames-ezequiel-bamio.onrender.com/users/${id}`);
      return dispatch({ type: GET_USER, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <GetUser>: ${error}`);
    }
  };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      await dispatch(axiosStart("users", []));
      let res = await axios.get(`https://videogames-ezequiel-bamio.onrender.com/users`);
      return dispatch({ type: GET_ALL_USER, payload: res.data });
    } catch (error) {
      await dispatch(axiosError(error));
      console.log(`Error, actions <getAllUsers>: ${error}`);
    }
  };
};

/* --------------- END USERS --------------- */

/* --------------- START GAMES --------------- */

export const getDetailGame = (id) => {
  return async function (dispatch) {
    try {
      dispatch(axiosStart("detailGame", {}));
      let res = await axios.get(`https://videogames-ezequiel-bamio.onrender.com/games/${id}`);
      return dispatch({ type: GET_DETAIL_GAME, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(`Error, actions <GetDetailGames>: ${error}`);
    }
  };
};

export const cleanAllGames = () => {
  return async function (dispatch) {
    try {
      dispatch(axiosStart("allVideogames"));
    } catch (error) {
      dispatch(axiosError(error));
      console.log(`Error, actions <GetAllGames>: ${error}`);
    }
  };
};

export const restoreGame = (id) => {
  return async function (dispatch) {
    try {
      dispatch(axiosStart("allGames"));
      let res = await axios.patch(`https://videogames-ezequiel-bamio.onrender.com/games/restore/${id}`);
      return dispatch({ type: RESTORE_GAME, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(error)
      console.log(`Error, actions <RestoreGame>: ${error}`);
    }
  };
};

export const patchFeaturedGame = (id) => {
  return async function (dispatch) {
    try {
      dispatch(axiosStart("allGames"));
      let res = await axios.patch(`https://videogames-ezequiel-bamio.onrender.com/games/featured/${id}`);
      return dispatch({ type: PATCH_FEATURED_GAME, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(error)
      console.log(`Error, actions <PatchNewGame>: ${error}`);
    }
  };
};

export const patchNewGame = (id) => {
  return async function (dispatch) {
    try {
      dispatch(axiosStart("allGames"));
      let res = await axios.patch(`https://videogames-ezequiel-bamio.onrender.com/games/isNew/${id}`);
      return dispatch({ type: PATCH_NEW_GAME, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(error)
      console.log(`Error, actions <PatchNewGame>: ${error}`);
    }
  };
};

export const deleteGame = (id) => {
  return async function (dispatch) {
    try {
      dispatch(axiosStart("allGames"));
      let res = await axios.delete(`https://videogames-ezequiel-bamio.onrender.com/games/${id}`);
      return dispatch({ type: DELETE_GAME, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(error)
      console.log(`Error, actions <DeleteGame>: ${error}`);
    }
  };
};

export const putGame = (value) => {
  return async function (dispatch) {
    try {
      dispatch(axiosStart("allGames"));
      let res = await axios.put("https://videogames-ezequiel-bamio.onrender.com/games", value);
      return dispatch({ type: POST_GAME, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(error)
      console.log(`Error, actions <CreateGame>: ${error}`);
    }
  };
};

export const createGame = (value) => {
  return async function (dispatch) {
    try {
      dispatch(axiosStart("allGames"));
      let res = await axios.post("https://videogames-ezequiel-bamio.onrender.com/games", value);
      return dispatch({ type: UPDATE_GAME, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(error)
      console.log(`Error, actions <CreateGame>: ${error}`);
    }
  };
};

export const getAllGames = () => {
  return async function (dispatch) {
    try {
      // dispatch(axiosStart("allGames"));
      let res = await axios.get("https://videogames-ezequiel-bamio.onrender.com/games");
      return dispatch({ type: GET_ALL_GAMES, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(`Error, actions <GetAllGames>: ${error}`);
    }
  };
};

export const getGames = () => {
  return async function (dispatch) {
    try {
      let res = await axios.get("https://videogames-ezequiel-bamio.onrender.com/games?active=true");
      return dispatch({ type: GET_GAMES, payload: res.data });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(`Error, actions <GetAllGames>: ${error}`);
    }
  };
};

export const filterSearch = ( value ) => {
  return async function (dispatch) {
    try {
      return dispatch({ type: FILTER_SEARCH, payload: value });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(error);
      console.log(`Error, actions <SearchGames>: ${error}`);
    }
  };
};

export const ordersGames = ( type, value ) => {
  return async function (dispatch) {
    try {
      let res = await axios.get("https://videogames-ezequiel-bamio.onrender.com/games");
      return dispatch({ type: ORDERS_GAMES, payload: { games: res.data, type, value } });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(error);
      console.log(`Error, actions <OrdersGames>: ${error}`);
    }
  };
};

export const filtersGames = ( type, value ) => {
  return async function (dispatch) {
    try {
      let res = await axios.get("https://videogames-ezequiel-bamio.onrender.com/games");
      return dispatch({ type: FILTERS_GAMES, payload: { games: res.data, type, value } });
    } catch (error) {
      dispatch(axiosError(error));
      console.log(error);
      console.log(`Error, actions <FiltersGames>: ${error}`);
    }
  };
};

/* --------------- END GAMES --------------- */

export const axiosError = (error) => {
  return { type: AXIOS_ERROR, payload: error };
};

export const axiosStart = (state, value) => {
  return { type: AXIOS_START, payload: !value ? [] : value, state: state };
};
