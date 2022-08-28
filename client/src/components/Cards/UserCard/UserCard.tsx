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
                        <label><FaUserAlt /> Nombre</label>
                        <input type="text" disabled={disableFieldsProfile} value={user.firstname} placeholder='Nombre...' />
                    </div>
                    <div className={s.profile_card_fields}>

                        <label><FaUserAlt /> Apellido</label>
                        <input type="text" disabled={disableFieldsProfile} value={user.lastname} placeholder='Apellido...' />
                    </div>
                    <div className={s.profile_card_fields}>

                        <label><MdEmail /> Email</label>
                        <input type="text" disabled={disableFieldsProfile} value={user.email} placeholder='Email...' />
                    </div>
                    <div className={s.profile_card_fields}>

                        <label><MdOutlinePermContactCalendar /> Fecha de nacimiento</label>
                        <input type="text" disabled={disableFieldsProfile} value={user.date_of_birth} placeholder='Fecha de nacimiento...' />
                    </div>
                    <div className={s.profile_card_fields}>
                        <label><BsFillTelephoneFill /> Telefono</label>
                        <input type="text" disabled={disableFieldsProfile} value={user.phone} placeholder='Telefono...' />
                    </div>

                    {/* <div class>
                            <p><BiUserCircle /> {user.active ? 'Activo' : 'Desactivado'}</p>
                            <p><RiAdminLine /> {user.rol}</p>
                            <p><MdShoppingBasket /> 0</p>
                        </div> */}
                    <button className={s.profile_card_btn}>Confirmar</button>
                </div>
            </div>
        </header>
    )
}