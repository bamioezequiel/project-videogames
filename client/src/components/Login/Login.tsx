import { useEffect, useState } from 'react';
import { BsCheck2Circle, BsDashCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { getCart } from '../../redux/actions';
import { validationsLogin } from '../../utils/validations';
import useLoading from '../Loading/Loading';
import s from './Login.module.css';

export default function Login() {
    const navigate = useNavigate();
    const dispatch: Function = useDispatch();
    const { login } = useAuth();
    const user = useSelector((state: any) => state.user)
    const { saveAllItemsInCart } = useCart();
    const [loading, setLoading] = useState(false);
    const { Loading } = useLoading();
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general: ""
    });

    useEffect( () => {
        return () => {
            setLoading(true);
            window.location.reload();
            redirect();
        }
    }, [] )

    const redirect = () => {
        navigate('/');
    }

    const handleChange = (e: any) => {
        e.preventDefault();
        setLoginUser({
            ...loginUser,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrors(validationsLogin({
            ...loginUser,
            [e.target.name]: e.target.value
        }));
        console.log(errors)
        if (errors.email || errors.password || errors.general) { return; }
        console.log(errors)
        if (!loginUser.email.length || !loginUser.password.length) { return; }
        console.log(loginUser)
        try {
            const res = await login(loginUser);
            await dispatch(getCart(res.payload.user.id))
            saveAllItemsInCart(res.payload.user.id);
            if (user === "false") {
                setErrors({
                    ...errors,
                    general: "El usuario o la contraseña no son validos"
                });
            } else if (loginUser.email === user.email) {
                // redirect();
            } else {
                setErrors({
                    ...errors,
                    general: "El usuario o la contraseña no son validos"
                });
            }
        } catch (error) {
            setErrors({
                ...errors,
                general: "El usuario o la contraseña no son validos"
            });
            console.log(`Error, actions <LoginUser>: ${error}`)
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
                                (errors.general.length > 0)
                                    ? <BsCheck2Circle color='red' />
                                    : <BsDashCircle />
                            } Email
                        </label>
                        {errors.general && <span className={s.login_error}>{errors.general}</span>}
                        <input type="text" className={s.login_form_input} name='email' value={loginUser.email} onChange={handleChange}
                            placeholder='Email...' />
                        <label className={s.login_form_label}>
                            {
                                (errors.general.length > 0)
                                    ? <BsCheck2Circle color='red' />
                                    : <BsDashCircle />
                            } Contraseña
                        </label>
                        <input type="password" className={s.login_form_input} name='password' value={loginUser.password} onChange={handleChange}
                            placeholder='Password...' />
                    </div>
                    <button onClick={handleSubmit} className={s.login_btn}>Log In</button>
                    <button className={s.login_btn_without_background}>Forgot Password?</button>
                </form>
                <hr className={s.login_line} />
                <span className={s.login_text_register}>Don't have an account?</span>
                <NavLink to='/signup' className={s.login_btn_without_background}>Sing up</NavLink>
            </div>
        </div>
    )
}