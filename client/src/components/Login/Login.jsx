import { useEffect, useState } from "react";
import { BsCheck2Circle, BsDashCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { getCart, getFavorites, getUser } from "../../redux/actions";
import { handleValidationLogin, toastOptions } from "../../utils/validations";
import useLoading from "../Loading/Loading";
import s from "./Login.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const user = useSelector((state) => state.user);
  const { saveAllItemsInCart } = useCart();
  const [loading, setLoading] = useState(false);
  const { Loading } = useLoading();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  /*  useEffect( () => {
        return () => {
            setLoading(true);
            window.location.reload();
            redirect();
        }
    }, [] ) */

  const redirect = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    if (!handleValidationLogin(input)) return;
    const { email, password } = input;
    const { data } = await axios.post(
      "/auth/login",
      {
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
        localStorage.setItem("token", data.token);
        dispatch(getUser(data.user._id));
        // navigate("/home");
      }
    }
  };

  return (
    <div className={s.login_container}>
      <div className={s.login_content}>
        <h2 className={s.login_title}>Log In</h2>
        <hr className={s.login_line} />
        <form action="" className={s.login_form}>
          <div className={s.login_form_input_container}>
            <label className={s.login_form_label}>
              {errors.general.length > 0 ? (
                <BsCheck2Circle color="red" />
              ) : (
                <BsDashCircle />
              )}{" "}
              Email
            </label>
            {errors.general && (
              <span className={s.login_error}>{errors.general}</span>
            )}
            <input
              type="text"
              className={s.login_form_input}
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email..."
            />
            <label className={s.login_form_label}>
              {errors.general.length > 0 ? (
                <BsCheck2Circle color="red" />
              ) : (
                <BsDashCircle />
              )}{" "}
              Contraseña
            </label>
            <input
              type="text"
              className={s.login_form_input}
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password..."
            />
          </div>
          <button onClick={handleSubmit} className={s.login_btn}>
            Log In
          </button>
          <button className={s.login_btn_without_background}>
            Forgot Password?
          </button>
        </form>
        <hr className={s.login_line} />
        <span className={s.login_text_register}>Don't have an account?</span>
        <NavLink to="/signup" className={s.login_btn_without_background}>
          Sing up
        </NavLink>
      </div>
    </div>
  );
}
