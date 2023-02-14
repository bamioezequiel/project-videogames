import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import {
  MdEmail,
  MdOutlinePermContactCalendar,
  MdShoppingBasket,
} from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import s from "./UserCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, putUser } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import { validationsUpdate } from "../../../utils/validations";
import axios from "axios";

export default function UserCard() {
  const dispatch = useDispatch();
  let { user } = useAuth();
  const [disableFieldsProfile, setDisableFieldsProfile] = useState(true);
  const [pictureUser, setPictureUser] = useState(user.picture);
  const [updateUser, setUpdateUser] = useState({
    name: user.name,
    lastname: user.lastname,
    picture: user.picture,
  });
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    picture: "",
  });

  useEffect(() => {
    setUpdateUser({
      name: user.name,
      lastname: user.lastname,
      picture: user.picture,
    });
    setErrors({
      name: "",
      lastname: "",
      picture: "",
    });
  }, []);

  const handleImage = async (file) => {
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "emhwd5ue");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/duie0xk67/image/upload",
        data
      );
      return res.data.secure_url;
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.name === "file") {
      setUpdateUser({
        ...updateUser,
        picture: await handleImage(e.target.files[0]),
      });
      setPictureUser(await handleImage(e.target.files[0]));
    } else {
      setUpdateUser({
        ...updateUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(
      validationsUpdate({
        ...updateUser,
        [e.target.name]: e.target.value,
      })
    );
    console.log(errors);
    if (errors.name || errors.lastname) {
      return;
    }
    if (!updateUser.name.length || !updateUser.lastname.length) {
      return;
    }
    try {
      const res = await dispatch(putUser({ id: user._id, ...updateUser }));
      setUpdateUser({
        name: res.payload.name,
        lastname: res.payload.lastname,
        picture: res.payload.picture,
      });
      setErrors({
        name: "",
        lastname: "",
        email: "",
        picture: "",
      });
    } catch (error) {
      // alert(error)
    }
  };

  return (
    <header className={s.profile_card}>
      <div
        style={{
          backgroundImage: `url(${pictureUser})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={s.profile_image_upload_wrap}
      >
        <input
          type="file"
          name="file"
          className={s.profile_file_upload_input}
          onChange={handleChange}
        />
      </div>
      <div className={s.profile_card_data}>
        <h2>
          {user.name} {user.lastname}
        </h2>
        <label className={s.profile_card_rol}>
          <RiAdminLine /> {user.role}
        </label>
        <div className={s.profile_card_data_content}>
          <div className={s.profile_card_fields}>
            <span style={{ color: "var(--color-red)" }}>
              {!errors.name ? "" : errors.name}
            </span>
            <label>
              <FaUserAlt /> First name
            </label>
            <input
              type="text"
              name="name"
              value={updateUser.name}
              onChange={handleChange}
              placeholder="First name..."
            />
          </div>
          <div className={s.profile_card_fields}>
            <span style={{ color: "var(--color-red)" }}>
              {!errors.lastname ? "" : errors.lastname}
            </span>

            <label>
              <FaUserAlt /> Last name
            </label>
            <input
              type="text"
              name="lastname"
              value={updateUser.lastname}
              onChange={handleChange}
              placeholder="Last name..."
            />
          </div>
          <button onClick={handleSubmit} className={s.profile_card_btn}>
            Confirm
          </button>
        </div>
      </div>
    </header>
  );
}
