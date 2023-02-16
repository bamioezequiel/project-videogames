import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { getAllUsers, giveAdmin, removeAdmin } from "../../../redux/actions";
import AdminNav from "../AdminNav/AdminNav";
import s from "./ListUsers.module.css";

export default function ListUsers() {
  const dispatch = useDispatch();
  const { user, token } = useAuth();
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleGiveAdmin = (e, id) => {
    e.preventDefault();
    console.log(token)
    dispatch(giveAdmin(id, token));
  };

  const handleRemoveAdmin = async (e, id) => {
    e.preventDefault();
    dispatch(removeAdmin(id, token));
  };

  return (
    <div className={s.listUsers_container}>
      <AdminNav />
      <div className="table_wrapper">
        <table className="fl_table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map((u) => {
                return (
                  <tr key={"usersList" + u.name}>
                    <td>{u._id}</td>
                    <td>{u.name}</td>
                    <td>{u.lastname}</td>
                    <td>{u.email}</td>
                    <td>
                      {u.role === "Admin" || u.role === "Owner" ? (
                        <div
                          onClick={(e) => handleRemoveAdmin(e, u._id)}
                          className="fl_table_true"
                        >
                          Active
                        </div>
                      ) : (
                        <div
                          onClick={(e) => handleGiveAdmin(e, u._id)}
                          className="fl_table_false"
                        >
                          Inactive
                        </div>
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
