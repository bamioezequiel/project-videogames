import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from './View.module.css';

export default function ViewButton(){
//   currentPage,
//   filteredGames,
//   indexOfFirstVideogame,
//   setgamesPerPage,
//   setCurrentPage,
// }) {
//   const dispatch = useDispatch();

//   function handleView(e) {
//     e.preventDefault();
//     setCurrentPage(1);

//     const currentPage = filteredGames.slice(
//       indexOfFirstVideogame,
//       parseInt(e.target.value)
//     );

//     setgamesPerPage(parseInt(e.target.value));
//   }

  return (
    // <select className={s.select} onChange={(e) => handleView(e)}>
    <select className={s.selectView}>
      <option value="10">View 10</option>
      <option value="25">View 25</option>
      <option value="50">View 50</option>
    </select>
  );
}
