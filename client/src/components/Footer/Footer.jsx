import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <div className={s.footer_container}>
      <hr />
      <footer className={s.footer}>
        <div className={s.firstLineFooter}>
          <div className={s.footer_social}>
            <a href="/" className={s.footer_social_icon}><FaFacebookF /></a>
            <a href="/" className={s.footer_social_icon}><FaTwitter /></a>
            <a href="/" className={s.footer_social_icon}><FaYoutube /></a>
            <a href="/" className={s.footer_social_icon}><FaInstagram /></a>
            <a href="/" className={s.footer_social_icon}><FaLinkedinIn /></a>
          </div>
        </div>
        <div className={s.footer_links}>
          <NavLink to="/about" className={s.footer_link}>
            About us
          </NavLink>
          |
          <NavLink to="/privacy" className={s.footer_link}>
            Privacy &amp; Cookies
          </NavLink>
          |
          <NavLink to="/terms-and-conditions" className={s.footer_link}>
            Terms &amp; Conditions
          </NavLink>
          |
          <NavLink to="/faq" className={s.footer_link}>
            FAQ
          </NavLink>
        </div>
        <div className={s.footer_copyright}>
          <p>© Copyright. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}