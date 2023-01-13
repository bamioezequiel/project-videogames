import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { filterSearch } from "../../redux/actions";
import s from "../Home/Header/Header.module.css";

export default function SearchBar({ resetSelectors, paginado } ) {
  const dispatch = useDispatch();
  const [searchBar, setSearchBar] = useState(false);
  const searchGames = useSelector((state) => state.filteredGames)
  function handleSearchBar(e) {
    e.preventDefault();
    setSearchBar(!searchBar);
  }

  // function handleSearchSubmit(e){
  //   !input.length && alert('You have to insert a Videogame!');

  //   e.preventDefault();
  //   // dispatch(getNameGame(name));	
  //   // setCurrentPage(1);
  //   // setInput('');
  // }

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value !== '') {
      dispatch(filterSearch(e.target.value));
      resetSelectors();
      paginado(1)
    }
  }

  setTimeout(function () {
    searchBar && setSearchBar(false);
    // TENGO QUE AGREGAR EL && INPUT.LENGTH
    // Limpiar search
  }, 20000);

  return (
    <div className={s.header_search_container}>
      <input
        type="search"
        placeholder="Search..."
        onChange={handleSearch}
        className={searchBar ? s.header_search : s.noneSBDisplay}
      // onChange xa setear el input
      // onSubmit={(e) = handleSearchSubmit(e)}
      />
      <div onClick={(e) => handleSearchBar(e)} className={s.search_icon_background}>
        <BiSearch className={s.header_search_icon} />
      </div>
    </div>
  )
}