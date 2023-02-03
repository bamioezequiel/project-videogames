import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsCheck2Circle, BsDashCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  handleValidationSingup,
  toastOptions,
  validationsRegister,
} from "../../utils/validations";
import { getCart } from "../../redux/actions";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import s from "./Signup.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register } = useAuth();
  const { saveAllItemsInCart } = useCart();

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidationSingup(input)) return;

    console.log("holaaa");
    const { name, lastname, email, password } = input;
    console.log(name)
    const { data } = await axios.post(
      "/auth/register",
      {
        name,
        lastname,
        email,
        password,
      },
      { withCredentials: true }
    );
    console.log(data);
    if (data) {
      if (data.errors) {
        const { email, password } = data.errors;
        if (email) toast.error(email, toastOptions);
        else if (password) toast.error(password, toastOptions);
      } else {
        console.log(data);
        /* localStorage.setItem('token', data.token);
              localStorage.setItem('data-user', data.user); */
        navigate("/login");
      }
    }
  };

  return (
    <div className={s.signup_container}>
      <div className={s.signup_content}>
        <h2 className={s.signup_title}>Create Account</h2>
        <hr className={s.signup_line} />
        <form action="" className={s.signup_form}>
          <div className={s.signup_form_input_container}>
            <label className={s.signup_form_label}>
              {errors.name.length > 0 ? (
                <BsCheck2Circle color="red" />
              ) : (
                <BsDashCircle />
              )}{" "}
              First name
              <br />
              <span className={s.signup_error}>
                {!errors.name ? "" : errors.name}
              </span>
            </label>
            <input
              type="text"
              style={
                errors.name
                  ? { borderColor: "var(--color-red)" }
                  : undefined
              }
              className={s.signup_form_input}
              name="name"
              value={input.name}
              onChange={handleChange}
              placeholder="First name..."
            />
            <label className={s.signup_form_label}>
              {errors.lastname.length > 0 ? (
                <BsCheck2Circle color="red" />
              ) : (
                <BsDashCircle />
              )}{" "}
              Last name
              <br />
              <span className={s.signup_error}>
                {!errors.lastname ? "" : errors.lastname}
              </span>
            </label>
            <input
              type="text"
              style={
                errors.lastname
                  ? { borderColor: "var(--color-red)" }
                  : undefined
              }
              className={s.signup_form_input}
              name="lastname"
              value={input.lastname}
              onChange={handleChange}
              placeholder="Last name..."
            />
            <label className={s.signup_form_label}>
              {errors.email.length > 0 ? (
                <BsCheck2Circle color="red" />
              ) : (
                <BsDashCircle />
              )}{" "}
              Email
              <br />
              <span className={s.signup_error}>
                {!errors.email ? "" : errors.email}
              </span>
            </label>
            <input
              type="text"
              style={
                errors.email ? { borderColor: "var(--color-red)" } : undefined
              }
              className={s.signup_form_input}
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email..."
            />
            <label className={s.signup_form_label}>
              {errors.password.length > 0 ? (
                <BsCheck2Circle color="red" />
              ) : (
                <BsDashCircle />
              )}{" "}
              Password
              <br />
              <span className={s.signup_error}>
                {!errors.password ? "" : errors.password}
              </span>
            </label>
            <input
              type="password"
              style={
                errors.password
                  ? { borderColor: "var(--color-red)" }
                  : undefined
              }
              className={s.signup_form_input}
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password..."
            />
          </div>
          <button onClick={handleSubmit} className={s.signup_btn}>
            Sign Up
          </button>
        </form>
        <hr className={s.signup_line} />
        <span className={s.signup_alreadyAccount}>
          Already have an account?
        </span>
        <NavLink to="/login" className={s.signup_btn_without_background}>
          Log In
        </NavLink>
      </div>
    </div>
  );
}
