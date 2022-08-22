import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Signup.module.css';

export default function Signup() {
    return (
        <div className={s.signup_container}>
            <div className={s.signup_content}>
                <h2 className={s.signup_title}>Create Account</h2>
                <button className={s.signup_with}>Log in with Google</button>
                <hr className={s.signup_line} />
                <form action="" className={s.signup_form}>
                    <div className={s.signup_form_input_container}>
                        <input type="text" className={s.signup_form_input} placeholder='Username...' />
                        <input type="text" className={s.signup_form_input} placeholder='Email...' />
                        <input type="text" className={s.signup_form_input} placeholder='Password...' />
                    </div>
                    <button className={s.signup_btn}>Sign Up</button>
                </form>
                <hr className={s.signup_line} />
                <span>Already have an account?</span>
                <NavLink to='/login' className={s.signup_btn_without_background}>Log In</NavLink>
            </div>
        </div>
    )
}