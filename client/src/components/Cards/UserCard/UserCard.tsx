import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { MdEmail, MdOutlinePermContactCalendar, MdShoppingBasket } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { RiAdminLine } from 'react-icons/ri';
import { FaUserAlt, FaUserEdit } from 'react-icons/fa';
import s from './UserCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, putUser } from '../../../redux/actions';
import { useParams } from 'react-router-dom';
import { validationsUpdate } from '../../../utils/validations';
import axios from 'axios';

export default function UserCard() {
    const dispatch: Function = useDispatch();
    let { user }: any = useAuth();
    const [disableFieldsProfile, setDisableFieldsProfile] = useState(true);
    const [pictureUser, setPictureUser] = useState(user.picture)
        const [updateUser, setUpdateUser] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        picture: user.picture,
        dateBirth: user.date_of_birth
    });
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        picture: '',
        dateBirth: ''
    });

    useEffect(() => {

        setUpdateUser({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            picture: user.picture,
            dateBirth: user.date_of_birth
        });
        setErrors({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            picture: '',
            dateBirth: ''
        });
    }, [])

    const handleImage = async (file: any) => {
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
    }

    const handleChange = async (e: any) => {
        e.preventDefault();
        if (e.target.name === "file") {
            setUpdateUser({
                ...updateUser,
                picture: await handleImage(e.target.files[0])
            });
            setPictureUser(await handleImage(e.target.files[0]))
        } else {
            setUpdateUser({
                ...updateUser,
                [e.target.name]: e.target.value
            });
        }

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrors(validationsUpdate({
            ...updateUser,
            [e.target.name]: e.target.value
        }));
        console.log(errors)
        if (errors.firstname || errors.lastname || errors.phone || errors.dateBirth || errors.email) {
            return;
        }
        if (!updateUser.firstname.length || !updateUser.lastname.length || !updateUser.phone.length || !updateUser.dateBirth.length || !updateUser.email.length) {
            return;
        }
        try {
            const res = await dispatch(putUser({ id: user.id, date_of_birth: updateUser.dateBirth, ...updateUser }));
            setUpdateUser({
                firstname: res.payload.firstname,
                lastname: res.payload.lastname,
                email: res.payload.email,
                phone: res.payload.phone,
                picture: res.payload.picture,
                dateBirth: res.payload.date_of_birth
            });
            setErrors({
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                picture: '',
                dateBirth: ''
            });
        } catch (error) {
            // alert(error)
        }
    }

    return (
        <header className={s.profile_card}>
            <div style={{
                backgroundImage: `url(${pictureUser})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} className={s.profile_image_upload_wrap}>
                <input type="file" name="file" className={s.profile_file_upload_input} onChange={handleChange} />           
            </div>
            <div className={s.profile_card_data}>
                <h2>{user.firstname} {user.lastname} <FaUserEdit onClick={() => setDisableFieldsProfile(!disableFieldsProfile)} /></h2>
                <div className={s.profile_card_data_content}>
                    <div className={s.profile_card_fields}>
                        <span style={{ color: 'var(--color-red)' }}>{!errors.firstname ? '' : errors.firstname}</span>
                        <label><FaUserAlt /> First name</label>
                        <input type="text"
                            name='firstname'
                            disabled={disableFieldsProfile}
                            value={updateUser.firstname}
                            onChange={handleChange}
                            placeholder='First name...' />
                    </div>
                    <div className={s.profile_card_fields}>
                        <span style={{ color: 'var(--color-red)' }}>{!errors.lastname ? '' : errors.lastname}</span>

                        <label><FaUserAlt /> Last name</label>
                        <input type="text"
                            name='lastname'
                            disabled={disableFieldsProfile}
                            value={updateUser.lastname}
                            onChange={handleChange}
                            placeholder='Last name...' />
                    </div>
                    <div className={s.profile_card_fields}>
                        <span style={{ color: 'var(--color-red)' }}>{!errors.email ? '' : errors.email}</span>
                        <label><MdEmail /> Email</label>
                        <input type="text"
                            disabled={disableFieldsProfile}
                            value={updateUser.email}
                            onChange={handleChange}
                            placeholder='Email...' />
                    </div>
                    <div className={s.profile_card_fields}>
                        <span style={{ color: 'var(--color-red)' }}>{!errors.dateBirth ? '' : errors.dateBirth}</span>
                        <label><MdOutlinePermContactCalendar /> Date of Birth</label>
                        <input type="date"
                            name='dateBirth'
                            max={new Date().toISOString().split("T")[0]}
                            disabled={disableFieldsProfile}
                            value={updateUser.dateBirth}
                            onChange={handleChange}
                            placeholder='Date of Birth...' />
                    </div>
                    <div className={s.profile_card_fields}>
                        <label><BsFillTelephoneFill /> Phone</label>
                        <input type="text"
                            name='phone'
                            disabled={disableFieldsProfile}
                            value={updateUser.phone}
                            onChange={handleChange}
                            placeholder='Phone...' />
                    </div>

                    {/* <div class>
                            <p><BiUserCircle /> {user.active ? 'Activo' : 'Desactivado'}</p>
                            <p><RiAdminLine /> {user.rol}</p>
                            <p><MdShoppingBasket /> 0</p>
                        </div> */}
                    <button onClick={handleSubmit} className={s.profile_card_btn}>Confirm</button>
                </div>
            </div>
        </header>
    )
}