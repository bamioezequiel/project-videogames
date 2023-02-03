import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/CardGame/Card";
import s from "./Store.module.css";
import Pagination from "../Pagination/Pagination";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import View from "../View/View";
import {
  filtersGames,
  getAllGames,
  getCart,
  getGames,
  ordersGames,
} from "../../redux/actions";
import useCart from "../../hooks/useCart";

export default function Store() {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const filterGenres = useSelector((state) => state.filterGenres);
  const filterPlatforms = useSelector((state) => state.filterPlatforms);
  const filterTags = useSelector((state) => state.filterTags);
  const filteredGames = useSelector((state) => state.filteredGames);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setgamesPerPage] = useState(12);
  const [render, setRender] = useState("");
  const indexOfLastVideogame = currentPage * gamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - gamesPerPage;
  const currentVideogames =
    filteredGames?.length &&
    filteredGames?.slice(indexOfFirstVideogame, indexOfLastVideogame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getGames());
  }, []);

  const resetSelectors = () => {
    document.getElementById("rating").value = "x";
    document.getElementById("price").value = "x";
    document.getElementById("alpha").value = "x";
    document.getElementById("alpha").value = "x";
    document.getElementById("genres").value = "x";
    document.getElementById("platforms").value = "x";
    document.getElementById("tags").value = "x";
  };

  const handleChangeSelect = async (e) => {
    e.preventDefault();

    if (e.target.id === "reset") {
      resetSelectors();
      await dispatch(getAllGames());
      return;
    }

    if (
      e.target.id === "tags" ||
      e.target.id === "genres" ||
      e.target.id === "platforms"
    ) {
      await dispatch(filtersGames(e.target.id, e.target.value));
    }

    if (
      e.target.id === "alpha" ||
      e.target.id === "rating" ||
      e.target.id === "price"
    ) {
      if (e.target.id === "alpha") {
        document.getElementById("rating").value = "x";
        document.getElementById("price").value = "x";
      }
      if (e.target.id === "rating") {
        document.getElementById("price").value = "x";
        document.getElementById("alpha").value = "x";
      }
      if (e.target.id === "price") {
        document.getElementById("alpha").value = "x";
        document.getElementById("rating").value = "x";
      }

      await dispatch(ordersGames(e.target.id, e.target.value));
    }
    setRender(`Filter: ${e.target.id}: ${e.target.value}`);
    paginado(1);
  };

  return (
    <div className={s.store_container}>
      <div className={s.store_filter}>
        <select id="tags" onChange={handleChangeSelect}>
          <option value="x" disabled>
            Choose a tag
          </option>
          <option value="all" selected={filterTags.value === "" ? true : false}>
            All tags
          </option>
          {tags.length > 0 &&
            tags.map((tag) => {
              return (
                <option
                  key={tag}
                  selected={filterTags.value === tag ? true : false}
                  value={tag}
                >
                  {tag}
                </option>
              );
            })}
        </select>
        <select id="platforms" onChange={handleChangeSelect}>
          <option value="x" disabled>
            Choose a platform
          </option>
          <option
            value="all"
            selected={filterPlatforms.value === "" ? true : false}
          >
            All platforms
          </option>
          {platforms.length > 0 &&
            platforms.map((platform) => {
              return (
                <option
                  key={platform}
                  selected={filterPlatforms.value === platform ? true : false}
                  value={platform}
                >
                  {platform}
                </option>
              );
            })}
        </select>
        <select id="genres" onChange={handleChangeSelect}>
          <option value="x" disabled>
            Choose a genre
          </option>
          <option
            value="all"
            selected={filterGenres.value === "" ? true : false}
          >
            All genres
          </option>
          {genres.length > 0 &&
            genres.map((genre) => {
              return (
                <option
                  key={genre}
                  selected={filterGenres.value === genre ? true : false}
                  value={genre}
                >
                  {genre}
                </option>
              );
            })}
        </select>
        {/* <span>Rating</span> */}
        <select id="alpha" onChange={handleChangeSelect}>
          <option key="alpha1" value="x" selected disabled>
            Choose the order
          </option>
          <option key="alphaAll" value="all">
            -
          </option>
          <option key="alphaAsc" value="asc">
            A-Z
          </option>
          <option key="alphaDesc" value="desc">
            Z-A
          </option>
        </select>
        <select id="rating" onChange={handleChangeSelect}>
          <option key="rating1" value="x" selected disabled>
            Choose the rating
          </option>
          <option key="ratingAll" value="all">
            -
          </option>
          <option key="ratingAsc" value="asc">
            5-1
          </option>
          <option key="ratingDesc" value="desc">
            1-5
          </option>
        </select>
        <select id="price" onChange={handleChangeSelect}>
          <option key="price1" value="x" selected disabled>
            Choose the price
          </option>
          <option key="priceAll" value="all">
            -
          </option>
          <option key="priceAsc" value="asc">
            10000-1
          </option>
          <option key="priceDesc" value="desc">
            1-10000
          </option>
        </select>
        <button id="reset" onClick={handleChangeSelect}>
          Reset
        </button>
        <span>
          <SearchBar resetSelectors={resetSelectors} paginado={paginado} />
        </span>
      </div>
      <div className={s.store_pagination_view_container}>
        <div className={s.viewContainer}></div>
        <div className={s.store_pagination}>
          <Pagination
            gamesPerPage={gamesPerPage}
            allGames={filteredGames?.length}
            paginado={paginado}
            currentPage={currentPage}
          />
        </div>
        <div className={s.viewContainer}>
          {filteredGames.length > 0 && (
            <View
              filteredGames={filteredGames}
              indexOfFirstVideogame={indexOfFirstVideogame}
              setgamesPerPage={setgamesPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
      <div className={s.store_list}>
        {currentVideogames?.length &&
          currentVideogames?.map((g) => {
            return (
              <Card
                game={g}
                tag={
                  g.on_sale > 0 ? "ON SALE" : g.featured ? "FEATURED" : "BUY"
                }
              />
            );
          })}
      </div>
      <Footer />
    </div>
  );
}
