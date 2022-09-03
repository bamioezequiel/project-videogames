import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { getAllUsers, giveAdmin, removeAdmin } from "../../../redux/actions";
import AdminNav from "../AdminNav/AdminNav";
import s from './ListUsers.module.css';

export default function ListUsers() {
    const dispatch: Function = useDispatch();
    const { user, token } = useAuth();
    const users = useSelector((state: any) => state.users);
    useEffect(() => {
        dispatch(getAllUsers());

    }, []);

    const handleGiveAdmin = (e: any, id: any) => {
        e.preventDefault();
        dispatch(giveAdmin(id, token));
        dispatch(getAllUsers());
    }

    const handleRemoveAdmin = async (e: any, id: any) => {
        e.preventDefault();
        dispatch(removeAdmin(id, token));
        dispatch(getAllUsers());
    }


    return (
        <div className={s.listUsers_container}>
            <AdminNav />
            <div className='table_wrapper'>
                <table className='fl_table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Date of birth</th>
                            <th>Phone</th>
                            <th>Admin</th>
                            <th>Active</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length &&
                            users.map((u: any) => {
                                return (
                                    <tr key={"usersList" + u.firstname}>
                                        <td>#{u.id}</td>
                                        <td>{u.firstname}</td>
                                        <td>{u.lastname}</td>
                                        <td>{u.email}</td>
                                        <td>{u.date_of_birth ? u.date_of_birth : ' '}</td>
                                        <td>{u.phone ? u.phone : ' '}</td>   
                                        <td>
                                            {
                                                (u.rol === 'Admin' || u.rol === 'Owner') ? (
                                                    <div onClick={(e) => handleRemoveAdmin(e, u.id)} className='fl_table_true'>Active</div>
                                                ) : (
                                                    <div onClick={(e) => handleGiveAdmin(e, u.id) }className='fl_table_false'>Inactive</div>
                                                )
                                            }
                                        </td>                                     
                                        <td>
                                            {
                                                (u.active) ? (
                                                    <div className='fl_table_true'>Active</div>
                                                ) : (
                                                    <div className='fl_table_false'>Inactive</div>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <button className='fl_table_btn'>
                                                <AiFillEdit />
                                            </button>
                                        </td>
                                        <td>
                                            <button className='fl_table_btn'>
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
    )
}