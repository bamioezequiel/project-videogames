import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { getAllUsers } from '../../redux/actions';
import AdminNav from './AdminNav/AdminNav';
import s from './Dashboard.module.css';

export default function Dashboard() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const users = useSelector( (state) => state.users );
    const allGames = useSelector( (state) => state.allGames );

    useEffect( () => {
        dispatch(getAllUsers());
    }, [] )

    return (
        <div className={s.dashboard_container}>
            <AdminNav />
            <div className={s.dashboard_welcome}>
                <h2>Welcome to Dashboard</h2>
                <p>Hello {user.firstname} {user.lastname}, welcome to your awesome dashboard</p>
            </div>
            <div className={s.dashboard_stats_container}>
                <div style={{ backgroundColor: 'var(--color-blue)' }} className={`${s.dashboard_stats_item}`}>
                    <h2>{users?.length}</h2>
                    <hr />
                    <h2>User registered</h2>
                </div>
                <div style={{ backgroundColor: 'var(--color-red)' }} className={`${s.dashboard_stats_item}`}>
                    <h2>{allGames?.length}</h2>
                    <hr />
                    <h2>Game registered</h2>
                </div>
                {/* <div style={{ backgroundColor: 'var(--color-yellow)' }} className={`${s.dashboard_stats_item}`}>
                    <h2>300</h2>
                    <hr />
                    <h2>Transactions</h2>
                </div> */}
                <div style={{ backgroundColor: 'var(--color-green)' }} className={`${s.dashboard_stats_item}`}>
                    <h2>300</h2>
                    <hr />
                    <h2>Transactions</h2>
                </div>
            </div>
            <div className={s.dashboard_staff_container}>
                <div className={s.dashboard_staff_item}>
                    <img src={user.picture} alt="" />
                    <div>
                        <h3>{user.firstname} {user.lastname}</h3>
                        <p>{user.rol}</p>
                    </div>
                </div>
                <div className={s.dashboard_staff_item}>
                    <img src={user.picture} alt="" />
                    <div>
                        <h3>{user.firstname} {user.lastname}</h3>
                        <p>{user.rol}</p>
                    </div>
                </div>
                <div className={s.dashboard_staff_item}>
                    <img src={user.picture} alt="" />
                    <div>
                        <h3>{user.firstname} {user.lastname}</h3>
                        <p>{user.rol}</p>
                    </div>
                </div>
                <div className={s.dashboard_staff_item}>
                    <img src={user.picture} alt="" />
                    <div>
                        <h3>{user.firstname} {user.lastname}</h3>
                        <p>{user.rol}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}