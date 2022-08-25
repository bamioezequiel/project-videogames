import Axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Signup.module.css';

export default function Signup() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [data, setData] = useState(null);
    const register = async (e: any) => {
        e.preventDefault();
        console.log(registerUsername)
        console.log(registerPassword)
        const res = await Axios({
            method: "POST",
            data: {
                email: registerUsername,
                password: registerPassword,
            },
            withCredentials: true,
            url: "http://localhost:3001/register",
        })
        console.log('res ' + res)
    };
    const getUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/user",
        }).then((res) => {
            setData(res.data);
            console.log(res.data);
        });
    };
    return (
        <div className={s.signup_container}>
            <div className={s.signup_content}>
                <h2 className={s.signup_title}>Create Account</h2>
                <button className={s.signup_with}>Log in with Google</button>
                <hr className={s.signup_line} />
                <form action="" className={s.signup_form}>
                    <div className={s.signup_form_input_container}>
                        <input type="text" className={s.signup_form_input} placeholder='Username...' />
                        <input type="text" className={s.signup_form_input} onChange={(e) => setRegisterUsername(e.target.value)}
                            placeholder='Email...' />
                        <input type="text" className={s.signup_form_input} onChange={(e) => setRegisterPassword(e.target.value)}
                            placeholder='Password...' />
                    </div>
                    <button onClick={register} className={s.signup_btn}>Sign Up</button>
                </form>
                <hr className={s.signup_line} />
                <span>Already have an account?</span>
                <NavLink to='/login' className={s.signup_btn_without_background}>Log In</NavLink>
            </div>
        </div>
    )
}