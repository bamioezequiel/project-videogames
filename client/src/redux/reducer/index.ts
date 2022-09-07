import { Action } from "../../interfaces/Action.interface";
import {
  AXIOS_ERROR,
  AXIOS_START,
  DELETE_CART,
  GET_ALL_GAMES,
  GET_CART,
  GET_CART_LOCAL_STORAGE,
  GET_DETAIL_GAME,
  GET_FAVORITES_LOCAL_STORAGE,
  GET_GENRES,
  GET_PLATFORMS,
  GET_TAGS,
  GET_USER,
  PUT_CART,
  CREATE_USER,
  LOGIN_USER,
  AUTHENTICATE_STATUS,
  LOGOUT_USER,
  GET_ALL_USER,
  FILTERS_GAMES,
  ORDERS_GAMES,
  ordersGames,
  FILTER_SEARCH,
  UPDATE_USER,
} from "../actions";

import { filterGames, orderings, search } from "./../../utils/filtersAndOrders";

const initialState = {
  allGames: [],
  filteredGames: [],
  tags: [],
  platforms: [],
  genres: [],
  favoritesLS: [],
  cartLS: [],
  users: [],
  cart: {},
  detailGame: {},
  user: {},
  orders: { type: "", value: "" },
  filterGenres: { value: "" },
  filterPlatforms: { value: "" },
  filterTags: { value: "" },
  loading: false,
  error: null,
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FILTER_SEARCH:
      let resultSearch = search(state.allGames, action.payload); 
    return {
      ...state,
      filteredGames: resultSearch
    };
    case FILTERS_GAMES:
      let resultFilters: any = [];
      if (action.payload.type === "reset") {
        return {
          ...state,
          loading: false,
          error: null,
          filteredGames: state.allGames,
          filterGenres: { value: "" },
          filterTags: { value: "" },
          filterPlatforms: { value: "" },
        };
      }

      let rtn = { type: "", value: "" };
      if (action.payload.type === "tags") {
        let all = action.payload.value === "all";
        if (
          (state.filteredGames.length === 0 && state.filterTags.value !== "") ||
          all
        ) {
          resultFilters = state.allGames;
          all = true;
        }

        resultFilters = filterGames(
          all ? resultFilters : state.filteredGames,
          action.payload.type,
          action.payload.value
        );
        if (state.filterGenres.value !== "") {
          resultFilters = filterGames(
            resultFilters,
            "genres",
            state.filterGenres.value
          );
        }
        if (state.filterPlatforms.value !== "") {
          resultFilters = filterGames(
            resultFilters,
            "platforms",
            state.filterPlatforms.value
          );
        }
        rtn = {
          type: "tags",
          value: action.payload.value !== "all" ? action.payload.value : "",
        };
      } else if (action.payload.type === "platforms") {
        let all = action.payload.value === "all";
        if (
          (state.filteredGames.length === 0 &&
            state.filterPlatforms.value !== "") ||
          all
        ) {
          resultFilters = state.allGames;
          all = true;
        }

        resultFilters = filterGames(
          all ? resultFilters : state.filteredGames,
          action.payload.type,
          action.payload.value
        );
        if (state.filterTags.value !== "") {
          resultFilters = filterGames(
            resultFilters,
            "tags",
            state.filterTags.value
          );
        }
        if (state.filterGenres.value !== "") {
          resultFilters = filterGames(
            resultFilters,
            "genres",
            state.filterGenres.value
          );
        }
        rtn = {
          type: "platforms",
          value: action.payload.value !== "all" ? action.payload.value : "",
        };
      } else if (action.payload.type === "genres") {
        let all = action.payload.value === "all";
        if (
          (state.filteredGames.length === 0 &&
            state.filterGenres.value !== "") ||
          all
        ) {
          resultFilters = state.allGames;
          all = true;
        }

        resultFilters = filterGames(
          all ? resultFilters : state.filteredGames,
          action.payload.type,
          action.payload.value
        );
        if (state.filterTags.value !== "") {
          resultFilters = filterGames(
            resultFilters,
            "tags",
            state.filterTags.value
          );
        }
        if (state.filterPlatforms.value !== "") {
          resultFilters = filterGames(
            resultFilters,
            "platforms",
            state.filterPlatforms.value
          );
        }
        rtn = {
          type: "genres",
          value: action.payload.value !== "all" ? action.payload.value : "",
        };
      }
      return {
        ...state,
        loading: false,
        error: null,
        filteredGames: resultFilters,
        filterGenres:
          rtn.type === "genres" ? { value: rtn.value } : state.filterGenres,
        filterTags:
          rtn.type === "tags" ? { value: rtn.value } : state.filterTags,
        filterPlatforms:
          rtn.type === "platforms"
            ? { value: rtn.value }
            : state.filterPlatforms,
      };
    case ORDERS_GAMES:
      const resultOrders = orderings(
        state.filteredGames,
        action.payload.type,
        action.payload.value
      );

      return {
        ...state,
        loading: false,
        error: null,
        filteredGames: resultOrders,
        orders: {
          type: action.payload.type,
          value: action.payload.value
        }
      };
    case PUT_CART:
      return {
        ...state,
        loading: false,
        error: null,
        cart: action.payload,
      };
    case DELETE_CART:
      return {
        ...state,
        loading: false,
        error: null,
        cart: action.payload,
      };
    case GET_CART:
      return {
        ...state,
        loading: false,
        error: null,
        cart: action.payload,
      };
    case GET_CART_LOCAL_STORAGE:
      return {
        ...state,
        loading: false,
        error: null,
        cartLS: action.payload,
      };
    case GET_FAVORITES_LOCAL_STORAGE:
      return {
        ...state,
        loading: false,
        error: null,
        favoritesLS: action.payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        loading: false,
        error: null,
        platforms: action.payload.sort(),
      };
    case GET_TAGS:
      return {
        ...state,
        loading: false,
        error: null,
        tags: action.payload.sort(),
      };
    case GET_GENRES:
      return {
        ...state,
        loading: false,
        error: null,
        genres: action.payload.sort(),
      };
    case AUTHENTICATE_STATUS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        error: null,
        user: {},
        cart: {},
      };
    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case CREATE_USER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.user,
      };
    case GET_USER:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case GET_ALL_USER:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload,
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
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
