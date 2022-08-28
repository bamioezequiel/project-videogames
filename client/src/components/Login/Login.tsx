import Axios from 'axios';
import axios from 'axios';
import { useState } from 'react';
import { BsCheck2Circle, BsDashCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser, postLoginUser } from '../../redux/actions';
import { validationsLogin } from '../../utils/validations';
import s from './Login.module.css';

export default function Login() {
    const navigate = useNavigate();
    const dispatch: Function = useDispatch();
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const redirect = () => {
        navigate('/');
    }

    const handleChange = (e: any) => {
        e.preventDefault();
        setLoginUser({
            ...loginUser,
            [e.target.name]: e.target.value
        });
        setErrors(validationsLogin({
            ...errors,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const emailRegex = /\S+@\S+/;
        if (!emailRegex.test(loginUser.email)) {
            alert("Ingrese datos válidos");
            return;
        }
        try {
            let user = await dispatch(postLoginUser(loginUser));
            if (user === "false") {
                alert("El usuario o la contraseña no son validos")

            } else if (loginUser.email === user.email) {
                localStorage.setItem('User', JSON.stringify(user))
                await dispatch(getUser(user.id))
                alert("Te logueaste correctamente!");
                redirect();

            } else {
                alert("El usuario o la contraseña no son validos");
            }
        } catch (error) {
            console.log(`Error, actions <LoginUser>: ${error}`)
            window.location.reload();
        }
    };

    return (
        <div className={s.login_container}>
            <div className={s.login_content}>
                <h2 className={s.login_title}>Log In</h2>
                <button className={s.login_with}>Log in with Google</button>
                <hr className={s.login_line} />
                <form action="" className={s.login_form}>
                    <div className={s.login_form_input_container}>
                        <label className={s.login_form_label}>
                            {
                                !loginUser.email ? <BsDashCircle />
                                    : errors.email.length > 0
                                        ? <BsCheck2Circle color='red' />
                                        : <BsCheck2Circle color='green' />
                            } Email
                        </label>
                        <input type="text" className={s.login_form_input} title={!errors.email ? 'No hay errores para corregir' : errors.email} name='email' value={loginUser.email} onChange={handleChange}
                            placeholder='Email...' />
                        <label className={s.login_form_label}>
                            <BsDashCircle /> Contraseña
                        </label>
                        <input type="password" className={s.login_form_input} name='password' value={loginUser.password} onChange={handleChange}
                            placeholder='Password...' />
                    </div>
                    <button onClick={handleSubmit} className={s.login_btn}>Log In</button>
                    <button className={s.login_btn_without_background}>Forgot Password?</button>
                </form>
                <hr className={s.login_line} />
                <span>Don't have an account?</span>
                <NavLink to='/signup' className={s.login_btn_without_background}>Sing up</NavLink>
            </div>
        </div>
    )
}