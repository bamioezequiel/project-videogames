import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AdminNav from "../AdminNav/AdminNav";
import s from "./ListGames.module.css";
import "./../Table.css";
import { AiFillEdit } from "react-icons/ai";
import { orderings } from "../../../utils/filtersAndOrders";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  deleteGame,
  getAllGames,
  patchFeaturedGame,
  patchNewGame,
  restoreGame,
} from "../../../redux/actions";
export default function ListGames() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allGames);
  const [games, setGames] = useState(allGames);
  const [orderType, setOrderType] = useState(false);

  useEffect(() => {
    setGames(allGames);
  }, [allGames]);

  const handleName = (e, typeOrder) => {
    e.preventDefault();
    let res = orderings(allGames, "alpha", typeOrder ? "asc" : "desc");
    setGames(res);
    setOrderType(!typeOrder);
  };
  const handleDate = (e, typeOrder) => {
    e.preventDefault();
    let res = orderings(allGames, "date", typeOrder ? "asc" : "desc");
    setGames(res);
    setOrderType(!typeOrder);
  };
  const handleRating = (e, typeOrder) => {
    e.preventDefault();
    let res = orderings(allGames, "rating", typeOrder ? "asc" : "desc");
    setGames(res);
    setOrderType(!typeOrder);
  };
  const handlePrice = (e, typeOrder) => {
    e.preventDefault();
    let res = orderings(allGames, "price", typeOrder ? "asc" : "desc");
    setGames(res);
    setOrderType(!typeOrder);
  };
  const handleOnSale = (e, typeOrder) => {
    e.preventDefault();
    let res = orderings(allGames, "onSale", typeOrder ? "asc" : "desc");
    setGames(res);
    setOrderType(!typeOrder);
  };
  const handleFeatured = (e, typeOrder) => {
    e.preventDefault();
    let res = orderings(allGames, "featured", typeOrder ? "asc" : "desc");
    setGames(res);
    setOrderType(!typeOrder);
  };
  const handleIsNew = (e, typeOrder) => {
    e.preventDefault();
    let res = orderings(allGames, "isNew", typeOrder ? "asc" : "desc");
    setGames(res);
    setOrderType(!typeOrder);
  };
  const handleActive = (e, typeOrder) => {
    e.preventDefault();
    let res = orderings(allGames, "active", typeOrder ? "asc" : "desc");
    setGames(res);
    setOrderType(!typeOrder);
  };
  const handleDelete = (e, id) => {
    e.preventDefault();
    (async () => {
      await dispatch(deleteGame(id));
      await dispatch(getAllGames());
    })();
    alert("The game was deleted");
    console.log(games);
  };
  const handleRestore = async (e, id, value) => {
    e.preventDefault();
    await dispatch(restoreGame(id, !value));
  };
  const handlePatchIsNew = async (e, id, value) => {
    e.preventDefault();
    await dispatch(patchNewGame(id, !value));
  };
  const handlePatchFeatured = async (e, id, value) => {
    e.preventDefault();
    await dispatch(patchFeaturedGame(id, !value));
  };

  return (
    <div className={s.listGames_container}>
      <AdminNav />
      <div className="table_wrapper">
        <table className="fl_table">
          <thead>
            <tr>
              <th>Id</th>
              <th
                style={{ cursor: "pointer" }}
                onClick={(e) => handleName(e, orderType)}
              >
                Name
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={(e) => handleDate(e, orderType)}
              >
                Released
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={(e) => handleRating(e, orderType)}
              >
                Rating
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={(e) => handlePrice(e, orderType)}
              >
                Price
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={(e) => handleOnSale(e, orderType)}
              >
                On sale
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={(e) => handleFeatured(e, orderType)}
              >
                Featured
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={(e) => handleIsNew(e, orderType)}
              >
                Is new
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={(e) => handleActive(e, orderType)}
              >
                Active
              </th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {console.log(games)}
            {games &&
              games?.length &&
              games?.map((g) => {
                return (
                  <tr key={"gamesList" + g.name}>
                    <td>{g._id}</td>
                    <td>{g.name}</td>
                    <td>{g.released}</td>
                    <td>{g.rating}</td>
                    <td>${g.price}</td>
                    <td>{g.on_sale}%</td>
                    <td>
                      {g.featured ? (
                        <div
                          onClick={(e) =>
                            handlePatchFeatured(e, g._id, g.featured)
                          }
                          className="fl_table_true"
                        >
                          Active
                        </div>
                      ) : (
                        <div
                          onClick={(e) =>
                            handlePatchFeatured(e, g._id, g.featured)
                          }
                          className="fl_table_false"
                        >
                          Inactive
                        </div>
                      )}
                    </td>
                    <td>
                      {g.is_new ? (
                        <div
                          onClick={(e) => handlePatchIsNew(e, g._id, g.is_new)}
                          className="fl_table_true"
                        >
                          Active
                        </div>
                      ) : (
                        <div
                          onClick={(e) => handlePatchIsNew(e, g._id, g.is_new)}
                          className="fl_table_false"
                        >
                          Inactive
                        </div>
                      )}
                    </td>
                    <td>
                      {g.active ? (
                        <div
                          onClick={(e) => handleRestore(e, g._id, g.active)}
                          className="fl_table_true"
                        >
                          Active
                        </div>
                      ) : (
                        <div
                          onClick={(e) => handleRestore(e, g._id, g.active)}
                          className="fl_table_false"
                        >
                          Inactive
                        </div>
                      )}
                    </td>
                    <td>
                      <NavLink
                        to={`/dashboard/update-game/${g._id}`}
                        className="fl_table_btn"
                      >
                        <AiFillEdit />
                      </NavLink>
                    </td>
                    <td>
                      <button
                        onClick={(e) => handleDelete(e, g._id)}
                        className="fl_table_btn"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
