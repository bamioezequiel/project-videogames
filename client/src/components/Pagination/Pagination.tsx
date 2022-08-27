import React from "react";
import { MdArrowBackIosNew, MdArrowForwardIos, MdPlayArrow } from "react-icons/md";
import s from "./Pagination.module.css";

export default function Pagination({gamesPerPage, allGames, paginado, currentPage } : any) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={s.pagination_container}>
        {pageNumbers.length > 1 && (
          <span
            key="prev"
            className={currentPage !== 1 ? s.pagArrow : s.noneDisplay}
            onClick={() => {
              if (currentPage > 1) {
                paginado(currentPage - 1);
              }
            }}
          >
            {currentPage !== 1 && <MdArrowBackIosNew />}
          </span>
        )}
        <div className={s.pageNumbersPag}>
          {pageNumbers &&
            pageNumbers.map((number) => (
              <span
                onClick={() => paginado(number)}
                className={currentPage === number ? s.pagination_selected : s.number}
                key={number + "games"}
              >
                {number}
              </span>
            ))}
        </div>
        {pageNumbers.length > 1 && (
          <span
            key="next"
            className={currentPage !== pageNumbers.length ? s.pagArrow : s.noneDisplay}
            onClick={() => {
              if (currentPage < pageNumbers.length) {
                paginado(currentPage + 1);
              }
            }}
          >
            {currentPage !== pageNumbers.length && <MdArrowForwardIos />}
          </span>
        )}
    </nav>
  );
}
