import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { getAllOrders, getAllUsers } from "../../redux/actions";
import AdminNav from "./AdminNav/AdminNav";
import s from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const allGames = useSelector((state) => state.allGames);
  const orders = useSelector((state) => state.orders);
  const caculateTransactions = () => {
    let transactions = 0;
    orders.forEach((value) => {
        if(value.status === "approved") {
            transactions += value.total
        }
    });
    return transactions
  }
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());    
  }, []);

  return (
    <div className={s.dashboard_container}>
      <div className={s.dashboard_welcome}>
        <h2>Welcome to Dashboard</h2>
        <p>
          Hello {user.firstname} {user.lastname}, welcome to your awesome
          dashboard
        </p>
      </div>
      <AdminNav />
      <div className={s.dashboard_stats_container}>
        <div
          style={{ backgroundColor: "var(--color-blue)" }}
          className={`${s.dashboard_stats_item}`}
        >
          <h2>{users?.length}</h2>
          <hr />
          <h2>User registered</h2>
        </div>
        <div
          style={{ backgroundColor: "var(--color-red)" }}
          className={`${s.dashboard_stats_item}`}
        >
          <h2>{allGames?.length}</h2>
          <hr />
          <h2>Game registered</h2>
        </div>
        <div
          style={{ backgroundColor: "var(--color-green)" }}
          className={`${s.dashboard_stats_item}`}
        >
          <h2>$ {caculateTransactions()}</h2>
          <hr />
          <h2>Transactions</h2>
        </div>
      </div>
    </div>
  );
}
