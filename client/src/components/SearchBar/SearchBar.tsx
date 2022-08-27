import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import s from "../Home/Header/Header.module.css";

export default function SearchBar(){
    const [searchBar, setSearchBar] = useState(false);

    function handleSearchBar(e: any){
      e.preventDefault();
      setSearchBar(!searchBar);
    }

    // function handleSearchSubmit(e: any){
    //   !input.length && alert('You have to insert a Videogame!');
    
    //   e.preventDefault();
    //   // dispatch(getNameGame(name));	
    //   // setCurrentPage(1);
    //   // setInput('');
    // }
  
    setTimeout(function(){
      searchBar && setSearchBar(false);
      // TENGO QUE AGREGAR EL && INPUT.LENGTH
  }, 20000);

    return(
        <div className={s.header_search_container}>
            <input
            type="search"
            placeholder="Search..."
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