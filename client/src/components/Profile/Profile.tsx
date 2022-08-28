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
                <button onClick={handleLogout}>Salir</button>
                <h2>Hello</h2>
                {/* 
                tab?
                    juegos compras    
                    setting
                    support?
                */}
            </div>

        </div>
    )
}