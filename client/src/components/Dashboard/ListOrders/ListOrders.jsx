import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import AdminNav from "../AdminNav/AdminNav";
import s from "./ListOrders.module.css";
import "./../Table.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../redux/actions";

export default function ListOrders() {
    const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div className={s.listOrders_container}>
      <AdminNav />
      <div className="table_wrapper">
        <table className="fl_table">
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length &&
              orders.map((o) => {
                return (
                  <tr key={"ordersList" + o.id}>
                    <td>{o._id}</td>
                    <td>{o.userId}</td>
                    <td>{o.updatedAt.split('T')[0]} {o.updatedAt.split('T')[1].split('.')[0]}</td>
                    <td>{o.total}</td>
                    <td>
                      {o.status === "approved" ? (
                        <div className="fl_table_true">Approved</div>
                      ) : (
                        <div className="fl_table_false">Cancel</div>
                      )}
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
