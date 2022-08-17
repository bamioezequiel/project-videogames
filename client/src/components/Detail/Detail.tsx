import React, { Fragment } from 'react';
import s from './Detail.module.css';

export default function Detail() {
    return (
        <div className={s.detail_background}
            style={{
                backgroundImage: `url("https://imgur.com/IRINZJc.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            <div className={s.detail_container}>
                <div className={s.detail_content}>
                
                </div>
            </div>
        </div>
    )
}