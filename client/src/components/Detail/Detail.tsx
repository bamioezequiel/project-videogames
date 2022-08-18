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
                    {/* carusel */}
                    <img src="https://imgur.com/IRINZJc.jpg" className={s.detail_main_image} alt="main_image" />
                    <div className={s.detail_content_right}>
                        <div>
                            <span>Accede a todas las actualizaciones actuales y previas</span>
                            <p>⭐⭐⭐⭐⭐</p>
                            <p>Release Date: 2015-12-07</p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quo quis placeat similique numquam, quasi iure. Et, molestias perferendis? Ipsum, voluptatem deserunt deleniti amet quis suscipit ducimus ut! Libero, Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quo quis placeat similique numquam, quasi iure. Et, molestias perferendis? Ipsum, voluptatem deserunt deleniti amet quis suscipit ducimus ut! Libero,
                            </p>
                        </div>
                        <div>
                            <span>$500 USD</span>
                        </div>
                        <div className={s.detail_btn_container}>
                            <button className={s.detail_btn}>Comprar ahora</button>
                            <button className={s.detail_btn}>Agregar al carrito</button>
                        </div>
                        <div className={s.detail_platform}>
                            <span className={s.detail_tag}><p>PC</p></span>
                            <span className={s.detail_tag}><p>PS4</p></span>
                            <span className={s.detail_tag}><p>PS5</p></span>
                        </div>
                        <div className={s.detail_geners}>
                            <span className={s.detail_tag}><p>Action</p></span>
                            <span className={s.detail_tag}><p>RPG</p></span>
                            <span className={s.detail_tag}><p>Adventure</p></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}