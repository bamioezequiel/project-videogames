import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import AdminNav from "../AdminNav/AdminNav";
import s from './ListOrders.module.css';
import './../Table.css';

export default function ListOrders() {
    const orders = [{ id: 1, date: '2022-09-01', total: 2000, status: 'Cancel' }];
    return (
        <div className={s.listOrders_container}>
            <AdminNav />
            <div className='table_wrapper'>
                <table className='fl_table'>
                    <thead>
                        <tr>
                            <th>Id</th>
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
                                        <td>#{o.id}</td>
                                        <td>{o.date}</td>
                                        <td>{o.total}</td>
                                        <td>
                                            {
                                                (o.status === 'Success') ? (
                                                    <div className='fl_table_true'>Success</div>
                                                ) : (
                                                    <div className='fl_table_false'>Cancel</div>
                                                )
                                            }
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