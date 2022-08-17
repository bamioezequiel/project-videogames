import React, { useState } from 'react';
import Features from './Features/Features';
import News from './News/News';
import Reviews from './Reviews/Reviews';
import s from './Tab.module.css';

export default function Tab() {

    const [showNews, setShowNews] = useState<boolean>(true);
    const [showReviews, setShowReviews] = useState<boolean>(false);
    const [showFeatures, setShowFeatures] = useState<boolean>(false);

    const handleShowNews = () => {
        setShowNews(true);
        setShowReviews(false);
        setShowFeatures(false);
    }
    const handleShowReviews = () => {
        setShowNews(false);
        setShowReviews(true);
        setShowFeatures(false);
    }
    const handleShowFeatures = () => {
        setShowNews(false);
        setShowReviews(false);
        setShowFeatures(true);
    }

    return (
        <div className={s.filter_container}>
            <div className={s.tabs_wrap}>
                <div onClick={handleShowNews} className={`${showNews ? s.tab_wrap_active : s.tab_wrap}`}>
                    <h2 className={s.tab_wrap_title}>News</h2>
                </div>
                <div onClick={handleShowReviews} className={`${showReviews ? s.tab_wrap_active : s.tab_wrap}`}>
                    <h2 className={s.tab_wrap_title}>Reviews</h2>
                </div>
                <div onClick={handleShowFeatures} className={`${showFeatures ? s.tab_wrap_active : s.tab_wrap}`}>
                    <h2 className={s.tab_wrap_title}>Features</h2>
                </div>
            </div>
            <div className={s.tab_content}>
                <News show={showNews} />
                <Reviews show={showReviews} />
                <Features show={showFeatures} />
            </div>
        </div>
    )
}