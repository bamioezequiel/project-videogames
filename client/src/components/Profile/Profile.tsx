import React, { useState } from 'react';
import useAuth from '../../utils/auth';
import s from './Profile.module.css';
import UserCard from '../Cards/UserCard/UserCard';
import { useDispatch } from 'react-redux';
import { getLogoutUser } from '../../redux/actions';

export default function Profile() {
    const dispatch: Function = useDispatch();

    const handleLogout = async (e: any) => {
        e.preventDefault();
        await dispatch(getLogoutUser());
        localStorage.removeItem('User');
    }

    return (
        <div className={s.profile_container}>
            <UserCard />
            <div className={s.profile_content}>
                <button onClick={handleLogout}>Leave</button>
                {/* <nav className={s.profile_nav}>
                    <span>Purchased games</span>
                    <div>
                        <button>Dashboard</button>Solo para admins
                    </div>
                </nav> */}
                <div className={s.table_container}>
                    <section>
                        <div className={s.tbl_header}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Date</th>
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
                                new Array(20).fill(false).map((el, i) => {
                                    return (
                                        <tr>
                                            <td>{i+1}</td>
                                            <td>2022-08-{Math.floor(Math.random() * 10)+10}</td>
                                            <td>${Math.floor(Math.random() * 500)}</td>
                                            <td>{Math.floor(Math.random() * 10)}</td>
                                            <td>Button</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                </div>
            </section>
        </div>
            </div >

        </div >
    )
}