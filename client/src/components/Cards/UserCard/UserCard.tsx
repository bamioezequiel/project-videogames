import React, { useState } from 'react';
import useAuth from '../../../utils/auth';
import { MdEmail, MdOutlinePermContactCalendar, MdShoppingBasket } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { RiAdminLine } from 'react-icons/ri';
import { FaUserAlt, FaUserEdit } from 'react-icons/fa';
import s from './UserCard.module.css';

export default function UserCard() {
    const [disableFieldsProfile, setDisableFieldsProfile] = useState(true);
    const { user }: any = useAuth();
    return (
        <header className={s.profile_card}>
            <img src={user.picture} className={s.profile_card_img} alt={`image not found ${user.name}`} />
            <div className={s.profile_card_data}>
                <h2>{user.firstname} {user.lastname} <FaUserEdit onClick={() => setDisableFieldsProfile(!disableFieldsProfile)} /></h2>
                <div className={s.profile_card_data_content}>
                    <div className={s.profile_card_fields}>
                        <label><FaUserAlt /> First name</label>
                        <input type="text" disabled={disableFieldsProfile} value={user.firstname} placeholder='First name...' />
                    </div>
                    <div className={s.profile_card_fields}>

                        <label><FaUserAlt /> Last name</label>
                        <input type="text" disabled={disableFieldsProfile} value={user.lastname} placeholder='Last name...' />
                    </div>
                    <div className={s.profile_card_fields}>

                        <label><MdEmail /> Email</label>
                        <input type="text" disabled={disableFieldsProfile} value={user.email} placeholder='Email...' />
                    </div>
                    <div className={s.profile_card_fields}>

                        <label><MdOutlinePermContactCalendar /> Date of Birth</label>
                        <input type="text" disabled={disableFieldsProfile} value={user.date_of_birth} placeholder='Date of Birth...' />
                    </div>
                    <div className={s.profile_card_fields}>
                        <label><BsFillTelephoneFill /> Phone</label>
                        <input type="text" disabled={disableFieldsProfile} value={user.phone} placeholder='Phone...' />
                    </div>

                    {/* <div class>
                            <p><BiUserCircle /> {user.active ? 'Activo' : 'Desactivado'}</p>
                            <p><RiAdminLine /> {user.rol}</p>
                            <p><MdShoppingBasket /> 0</p>
                        </div> */}
                    <button className={s.profile_card_btn}>Confirm</button>
                </div>
            </div>
        </header>
    )
}