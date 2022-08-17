import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Card.module.css";

export default function Card({ image, tag }: any) {

    return (
        <div className={s.wrapper}>
            <div className={s.wrapper_image}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}>
            </div>
            <div className={s.outer}>
                <div className={s.content}>
                    <span className={s.bg}>{tag}</span>
                    <h1>Afro<br /> baseball hair</h1>
                    <p>Shadow your real allegiance to New York's Pirate radio with this cool cap featuring the Graphic Know Wave logo.</p>

                    <div className={s.button}>
                        <NavLink to={`/detail/1`}>
                            $115
                        </NavLink>
                        <a className={s.cart_btn} href="#"><i className={`${s.cart_icon} ${s.ion_bag}`}></i>ADD TO CART</a>
                    </div>

                </div>
            </div>
        </div>
    );
}

{/* <div className={s.card_container}>
        <div className={s.card_image}
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            <span className={s.card_tag}>{tag}</span>

        </div>
        <div className={s.card_content}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit harum aliquam ipsam exercitationem vitae veniam minima eligendi tempore</p>
        </div>
    </div> */}