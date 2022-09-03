import React, { useState } from 'react';
import Featured from './Featured/Featured';
import New from './New/New';
import Reviews from './OnSale/OnSale';
import s from './Tab.module.css';

export default function Tab() {

    const [showNew, setShowNew] = useState<boolean>(true);
    const [showReviews, setShowReviews] = useState<boolean>(false);
    const [showFeatured, setShowFeatured] = useState<boolean>(false);

    const handleShowNew = () => {
        setShowNew(true);
        setShowReviews(false);
        setShowFeatured(false);
    }
    const handleShowReviews = () => {
        setShowNew(false);
        setShowReviews(true);
        setShowFeatured(false);
    }
    const handleShowFeatured = () => {
        setShowNew(false);
        setShowReviews(false);
        setShowFeatured(true);
    }

    return (
        <div className={s.filter_container}>
            <div className={s.tabs_wrap}>
                <div onClick={handleShowReviews} className={`${showReviews ? s.tab_wrap_active : s.tab_wrap}`}>
                    <h2 className={s.tab_wrap_title}>On sale</h2>
                </div>
                <div onClick={handleShowNew} className={`${showNew ? s.tab_wrap_active : s.tab_wrap}`}>
                    <h2 className={s.tab_wrap_title}>New</h2>
                </div>
                <div onClick={handleShowFeatured} className={`${showFeatured ? s.tab_wrap_active : s.tab_wrap}`}>
                    <h2 className={s.tab_wrap_title}>Featured</h2>
                </div>
            </div>
            <div className={s.tab_content}>
                <New show={showNew} />
                <Reviews show={showReviews} />
                <Featured show={showFeatured} />
            </div>
        </div>
    )
}