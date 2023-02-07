import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import s from "./Profile.module.css";
import UserCard from "../Cards/UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllCart, getAllUsers } from "../../redux/actions";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllCart(user._id));
  }, []);

  function handleReturn(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className={s.profile_container}>
      <h3 onClick={(e) => handleReturn(e)} className={s.returnBtn}>
        Return
      </h3>
      <UserCard />
      <div className={s.profile_content}>
        <nav className={s.profile_nav}>
          <span>Purchased games</span>
          <div>
            {isAdmin && (
              <NavLink to="/dashboard" className={s.profile_btn}>
                Dashboard
              </NavLink>
            )}
            <button className={s.profile_btn_leave} onClick={logout}>
              Leave
            </button>
          </div>
        </nav>
        <div className={s.table_container}>
          <section>
            <div className={s.tbl_header}>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Total price</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className={s.tbl_content}>
              <table>
                <tbody>
                    {
                        orders.length > 0 ? orders.map((el, i) => {
                            return (
                              <tr>
                                <td>{el._id}</td>
                                <td>{el.status}</td>
                                <td>{el.total}</td>
                                <td>{el.cart.length}</td>
                                <td>See more</td>
                              </tr>
                            );
                          }) : <p>Not orders</p>
                    }
                  {/* {new Array(20).fill(false).map((el, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>2022-08-{Math.floor(Math.random() * 10) + 10}</td>
                        <td>${Math.floor(Math.random() * 500)}</td>
                        <td>{Math.floor(Math.random() * 10)}</td>
                        <td>Button</td>
                      </tr>
                    );
                  })} */}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
