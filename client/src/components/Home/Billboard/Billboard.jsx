import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllGames, getGames } from "../../../redux/actions";
import Card from "../../Cards/CardGame/Card";
import s from "./Billboard.module.css";

export default function Billboard() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);

  useEffect(() => {
    if (!allGames.length) {
      dispatch(getGames());
    }
  }, [dispatch]);

  return (
    <div className={s.billboard_container}>
      <h2 className={s.billboard_title}>Store</h2>
      <div className={s.cards_container}>
        {allGames?.length > 0 ? (
          allGames
            .slice(0, 12)
            .map((g) => (
              <Card
                key={g.id + g.name}
                game={g}
                tag={
                  g.on_sale > 0 ? "ON SALE" : g.featured ? "FEATURED" : "BUY"
                }
              />
            ))
        ) : (
          <span>No games</span>
        )}
      </div>
      <NavLink to='/store' className={s.billboard_btn}>See more...</NavLink>
    </div>
  );
}
