import Axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../redux/actions';
import s from './Login.module.css';

export default function Login() {
    const dispatch: Function = useDispatch();
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: "",
    });
    function redireccionar() {
        // window.location = "http://localhost:3000/home";
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const emailRegex = /\S+@\S+/;
        if (!emailRegex.test(loginUser.email)) {
            alert("Ingrese datos válidos");
            return;
        }
  
        Axios.post(`http://localhost:3001/auth/login`, loginUser, {
            headers: {
                "Content-Type": "application/json",
            },
            auth: {
                username: loginUser.email,
                password: loginUser.password,
            },
            withCredentials: true,
        })
            .then(async (user) => {
                await dispatch(getUser(user.data.id))
                localStorage.setItem('User', JSON.stringify(user.data.id))
              console.log(user)
                //setTimeout (redireccionar(), 5000)

                if (user.data === "false") {
                    alert("El usuario o la contraseña no son validos")

                } else if (loginUser.email === user.data.email) {
                    alert("LogIn exitoso!")
                    redireccionar();
                    //   dispatch(getOnlyUser(user.data.id));    

                } else {
                    alert("El usuario o la contrasenia no son validos")
                }
            })

            .catch((err) => {
                alert("El usuario o la contrasenia no son validos")
                window.location.reload();
                console.log(err);
                console.log("SOY LA PROMESA ERROR");
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
                        <input type="text" className={s.login_form_input} onChange={(e) => {
                            setLoginUser({
                                ...loginUser,
                                email: e.target.value,
                            });
                        }}
                            value={loginUser.email}

                            placeholder='Username...' />
                        <input type="password" className={s.login_form_input} onChange={(e) => {
                            setLoginUser({
                                ...loginUser,
                                password: e.target.value,
                            });
                        }}
                            value={loginUser.password}
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