import React from 'react';
import Card from '../Cards/CardGame/Card';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';
import s from './Store.module.css';

export default function Store() {
    return (
        <div className={s.store_container}>
            <div className={s.store_filter}>
                <span>Search</span>
                <span>Tag</span>
                <span>Geners</span>
                <span>Rating</span>
                <span>Sort</span>
                <span>Order</span>
                <span>View</span>
            </div>
            <div className={s.store_pagination}>
                <span><MdArrowBackIosNew /></span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span><MdArrowForwardIos /></span>
            </div>
            <div className={s.store_list}>
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
                <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' />
            </div>
        </div>
    )
}