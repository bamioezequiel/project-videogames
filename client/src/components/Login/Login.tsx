import Axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Login.module.css';

export default function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);
    const login = async (e: any) => {
        e.preventDefault();
        console.log(loginUsername)
        console.log(loginPassword)
        let res = await Axios({
            method: "POST",
            data: {
                email: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:3001/login",
        });
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
        <div className={s.login_container}>
            <div className={s.login_content}>
                <h2 className={s.login_title}>Log In</h2>
                <button className={s.login_with}>Log in with Google</button>
                <hr className={s.login_line} />
                <form action="" className={s.login_form}>
                    <div className={s.login_form_input_container}>
                        <input type="text" className={s.login_form_input} onChange={(e) => setLoginUsername(e.target.value)}
                            placeholder='Username...' />
                        <input type="text" className={s.login_form_input} onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder='Password...' />
                    </div>
                    <button onClick={login} className={s.login_btn}>Log In</button>
                    <button className={s.login_btn_without_background}>Forgot Password?</button>
                </form>
                <hr className={s.login_line} />
                <span>Don't have an account?</span>
                <NavLink to='/signup' className={s.login_btn_without_background}>Sing up</NavLink>
            </div>
        </div>
    )
}