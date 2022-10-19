import { NavLink } from 'react-router-dom';
import s from './../Dashboard.module.css';

export default function AdminNav() {
    return (
        <nav className={s.dashboard_menu}>
            <NavLink to='/dashboard'>Home</NavLink>
            <NavLink to='/dashboard/create-game'>Create game</NavLink>
            <NavLink to='/dashboard/games'>List games</NavLink>
            <NavLink to='/dashboard/users'>List users</NavLink>
            <NavLink to='/dashboard/orders'>List orders</NavLink>
            {/* <NavLink to='/dashboard/'>Settings</NavLink> */}
        </nav>
    )
}