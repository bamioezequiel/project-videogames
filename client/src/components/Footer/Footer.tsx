import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import s from './Footer.module.css';

export default function Footer() {
    return (
        <div className={s.footer_container}>
      <div className={s.firstLineFooter}>
        <div className={s.footer_social}>
          <a href="/" className={s.footer_social_icon}>
            <FaFacebookF />
          </a>
          <a href="/" className={s.footer_social_icon}>
            <FaTwitter />
          </a>
          <a href="/" className={s.footer_social_icon}>
            <FaYoutube />
          </a>
          <a href="/" className={s.footer_social_icon}>
            <FaInstagram />
          </a>
          <a href="/" className={s.footer_social_icon}>
            <FaLinkedinIn />
          </a>
        </div>
      </div>
      <div className={s.footer_links}>
        <NavLink to="/about" className={s.footer_link}>
          Nosotros
        </NavLink>
        |
        <NavLink to="/privacy" className={s.footer_link}>
          Politica de privacidad
        </NavLink>
        |
        <NavLink to="/terms-and-conditions" className={s.footer_link}>
          Terminos y condiciones
        </NavLink>
        |
        <NavLink to="/faq" className={s.footer_link}>
          Preguntas frecuentes
        </NavLink>
      </div>
      <div className={s.footer_copyright}>
        <p>© Copyright. All rights reserved.</p>
      </div>
    </div>
    )
}