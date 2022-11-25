import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsCheck2Circle, BsDashCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { validationsRegister } from '../../utils/validations';
import { getCart } from '../../redux/actions';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import s from './Signup.module.css';

export default function Signup() {
    const dispatch: Function = useDispatch();
    const { register } = useAuth();
    const { saveAllItemsInCart } = useCart();
    const [registerUser, setRegisterUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        dateBirth: ''
    });
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        dateBirth: ''
    });

    const handleChange = async (e: any) => {
        e.preventDefault();
        setRegisterUser({
            ...registerUser,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrors(validationsRegister({
            ...registerUser,
            [e.target.name]: e.target.value
        }));

        if (errors.firstname || errors.lastname || errors.phone || errors.dateBirth || errors.email || errors.password) {
            return;
        }
        if (!registerUser.firstname.length || !registerUser.lastname.length || !registerUser.phone.length || !registerUser.dateBirth.length || !registerUser.email.length || !registerUser.password.length) {
            return;
        }
        try {
            const res = await register(registerUser);
            if(res) {
                alert("Te registraste correctamente!");
                await dispatch(getCart(res.payload.user.id))
                saveAllItemsInCart(res.payload.user.id);
            }
        } catch (error) {
            // alert(error)
        }

        setRegisterUser({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            dateBirth: ''
        });
        setErrors({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            dateBirth: ''
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
                        <label className={s.signup_form_label}>
                            {
                                (errors.firstname.length > 0)
                                    ? <BsCheck2Circle color='red' />
                                    : <BsDashCircle />
                            } First name
                            <br />
                            <span className={s.signup_error}>{!errors.firstname ? '' : errors.firstname}</span>
                        </label>
                        <input type="text" style={errors.firstname ? { borderColor: 'var(--color-red)' } : undefined} className={s.signup_form_input} name='firstname' value={registerUser.firstname} onChange={handleChange} placeholder='First name...' />
                        <label className={s.signup_form_label}>
                            {
                                (errors.lastname.length > 0)
                                    ? <BsCheck2Circle color='red' />
                                    : <BsDashCircle />
                            } Last name
                            <br />
                            <span className={s.signup_error}>{!errors.lastname ? '' : errors.lastname}</span>
                        </label>
                        <input type="text" style={errors.lastname ? { borderColor: 'var(--color-red)' } : undefined} className={s.signup_form_input} name='lastname' value={registerUser.lastname} onChange={handleChange} placeholder='Last name...' />
                        <label className={s.signup_form_label}>
                            {
                                errors.email.length > 0
                                    ? <BsCheck2Circle color='red' />
                                    : <BsDashCircle />
                            } Email
                            <br />
                            <span className={s.signup_error}>{!errors.email ? '' : errors.email}</span>
                        </label>
                        <input type="text" style={errors.email ? { borderColor: 'var(--color-red)' } : undefined} className={s.signup_form_input} name='email' value={registerUser.email} onChange={handleChange} placeholder='Email...' />
                        <label className={s.signup_form_label}>
                            {
                                (errors.password.length > 0)
                                    ? <BsCheck2Circle color='red' />
                                    : <BsDashCircle />
                            } Password
                            <br />
                            <span className={s.signup_error}>{!errors.password ? '' : errors.password}</span>
                        </label>
                        <input type="password" style={errors.password ? { borderColor: 'var(--color-red)' } : undefined} className={s.signup_form_input} name='password' value={registerUser.password} onChange={handleChange} placeholder='Password...' />
                        <label className={s.signup_form_label}>
                            {
                                (errors.password.length > 0)
                                    ? <BsCheck2Circle color='red' />
                                    : <BsDashCircle />
                            } Phone
                            <br />
                            <span className={s.signup_error}>{!errors.phone ? '' : errors.phone}</span>
                        </label>
                        <input type="text" style={errors.phone ? { borderColor: 'var(--color-red)' } : undefined} className={s.signup_form_input} name='phone' value={registerUser.phone} onChange={handleChange} placeholder='Phone...' />
                        <label className={s.signup_form_label}>
                            {
                                (errors.dateBirth.length > 0)
                                    ? <BsCheck2Circle color='red' />
                                    : <BsDashCircle />
                            } Date of Birth
                            <br />
                            <span className={s.signup_error}>{!errors.dateBirth ? '' : errors.dateBirth}</span>
                        </label>
                        <input type="date"
                            max={new Date().toISOString().split("T")[0]}
                            style={errors.dateBirth ? { borderColor: 'var(--color-red)' } : undefined}
                            className={s.signup_form_input}
                            name='dateBirth'
                            value={registerUser.dateBirth} onChange={handleChange} placeholder='Date of birth...' />
                    </div>
                    <button onClick={handleSubmit} className={s.signup_btn}>Sign Up</button>
                </form>
                <hr className={s.signup_line} />
                <span className={s.signup_alreadyAccount}>Already have an account?</span>
                <NavLink to='/login' className={s.signup_btn_without_background}>Log In</NavLink>
            </div>
        </div>
    )
}