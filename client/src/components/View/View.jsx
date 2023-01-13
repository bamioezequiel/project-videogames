import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from './View.module.css';

export default function ViewButton({
  currentPage,
  filteredGames,
  indexOfFirstVideogame,
  setgamesPerPage,
  setCurrentPage,
}) {
  const dispatch = useDispatch();

  function handleView(e) {
    e.preventDefault();
    setCurrentPage(1);

    const currentPage = filteredGames.slice(
      indexOfFirstVideogame,
      parseInt(e.target.value)
    );

    setgamesPerPage(parseInt(e.target.value));
  }

  return (
    <select className={s.selectView} onChange={(e) => handleView(e)}>
    {/* <select className={s.selectView}> */}
      <option value="12">View 12</option>
      <option value="24">View 24</option>
      <option value="48">View 48</option>
    </select>
  );
}
