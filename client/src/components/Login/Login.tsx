import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Login.module.css';

export default function Login() {
    return (
        <div className={s.login_container}>
            <div className={s.login_content}>
                <h2 className={s.login_title}>Log In</h2>
                <button className={s.login_with}>Log in with Google</button>
                <hr className={s.login_line} />
                <form action="" className={s.login_form}>
                    <div className={s.login_form_input_container}>
                        <input type="text" className={s.login_form_input} placeholder='Username...' />
                        <input type="text" className={s.login_form_input} placeholder='Password...' />
                    </div>
                    <button className={s.login_btn}>Log In</button>
                    <button className={s.login_btn_without_background}>Forgot Password?</button>
                </form>
                <hr className={s.login_line} />
                <span>Don't have an account?</span>
                <NavLink to='/signup' className={s.login_btn_without_background}>Sing up</NavLink>
            </div>
        </div>
    )
}