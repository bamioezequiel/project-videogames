import Axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsCheck2Circle, BsDashCircle } from 'react-icons/bs';
import s from './Signup.module.css';
import { useDispatch } from 'react-redux';
import { postUser } from '../../redux/actions';
import { validationsRegister } from '../../utils/validations';

export default function Signup() {
    const dispatch: Function = useDispatch();
    const [registerUser, setRegisterUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repeatPassword: '',
    });
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const handleChange = async (e: any) => {
        e.preventDefault();

        setRegisterUser({
            ...registerUser,
            [e.target.name]: e.target.value
        });
        setErrors(validationsRegister({
            ...errors,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(errors)
        if (!errors.email || !errors.password || !errors.repeatPassword) {
            alert('algo fallo')
            return;
        }
        console.log(registerUser)
        await dispatch(postUser(registerUser));
        setRegisterUser({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            repeatPassword: '',
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
                        <label className={s.sgnup_form_label}>
                            {
                                !registerUser.firstname
                                    ? (errors.firstname.length > 0)
                                        ? <BsCheck2Circle color='red' />
                                        : <BsDashCircle />
                                    : <BsCheck2Circle color='green' />
                            } Nombre
                        </label>
                        <input type="text" className={s.signup_form_input} title={!errors.firstname ? 'No hay errores para corregir' : errors.firstname} name='firstname' value={registerUser.firstname} onChange={handleChange} placeholder='Nombre...' />
                        <label className={s.sgnup_form_label}>
                            {
                                !registerUser.lastname
                                    ? (errors.lastname.length > 0)
                                        ? <BsCheck2Circle color='red' />
                                        : <BsDashCircle />
                                    : <BsCheck2Circle color='green' />
                            } Apellido
                        </label>
                        <input type="text" className={s.signup_form_input} title={!errors.lastname ? 'No hay errores para corregir' : errors.lastname} name='lastname' value={registerUser.lastname} onChange={handleChange} placeholder='Apellido...' />
                        <label className={s.sgnup_form_label}>
                            {
                                !registerUser.email ? <BsDashCircle />
                                    : errors.email.length > 0
                                        ? <BsCheck2Circle color='red' />
                                        : <BsCheck2Circle color='green' />
                            } Email
                        </label>
                        <input type="text" className={s.signup_form_input} title={!errors.email ? 'No hay errores para corregir' : errors.email} name='email' value={registerUser.email} onChange={handleChange} placeholder='Email...' />
                        <label className={s.sgnup_form_label}>
                            {
                                !registerUser.password ? <BsDashCircle />
                                    : errors.password.length > 0
                                        ? <BsCheck2Circle color='red' />
                                        : <BsCheck2Circle color='green' />
                            } Contraseña</label>
                        <input type="password" className={s.signup_form_input} title={!errors.password ? 'No hay errores para corregir' : errors.password} name='password' value={registerUser.password} onChange={handleChange} placeholder='Contraseña...' />
                        <label className={s.sgnup_form_label}>
                            {
                                !registerUser.repeatPassword ? <BsDashCircle />
                                    : errors.repeatPassword.length > 0
                                        ? <BsCheck2Circle color='red' />
                                        : <BsCheck2Circle color='green' />
                            } Repetir contraseña
                        </label>
                        <input type="password" className={s.signup_form_input} title={!errors.repeatPassword ? 'No hay errores para corregir' : errors.repeatPassword} name='repeatPassword' value={registerUser.repeatPassword} onChange={handleChange} placeholder='Repita la contraseña...' />
                    </div>
                    <button onClick={handleSubmit} className={s.signup_btn}>Sign Up</button>
                </form>
                <hr className={s.signup_line} />
                <span>Already have an account?</span>
                <NavLink to='/login' className={s.signup_btn_without_background}>Log In</NavLink>
            </div>{/* 
            <div className={s.singup_password_validate}>
                <p> <BsCheck2Circle color='green'/> Nombre</p>
                <p> <BsDashCircle /> Apellido</p>
                <p> <BsDashCircle /> Email</p>
                <p> <BsDashCircle /> Contraseña</p>
                <p> <BsDashCircle /> Repetir contraseña</p>
            </div> */}
        </div>
    )
}