import React from 'react';
import Card from '../../Cards/CardGame/Card';
import s from './../Tab.module.css';

export default function Features({ show }: any) {
    return (
        show && <div className={s.cards_container}>
            <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />
            <Card image='https://imgur.com/IRINZJc.jpg' tag='FEATURE' />
        </div>
    )
}