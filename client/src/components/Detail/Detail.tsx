import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getCartLocalStorage, getDetailGame, getFavoritesLocalStorage } from '../../redux/actions';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import s from './Detail.module.css';
import useCart from '../../hooks/useCart';

export default function Detail() {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const detailGame = useSelector((state: any) => state.detailGame);
    const { id } = useParams();
    const { cart, handleCart, setItemCart } = useCart();
    const [favoriteDetail, setFavoriteDetail] = useState(false);

    /* useEffect( () => {
        if(Object.keys(detailGame).length > 0) {
          setLoading(false);
        }
      }, [detailGame] ) */

    useEffect(() => {
        dispatch(getDetailGame(id));
        let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
        favoritesLS?.find((f: any) => f.id == id && setFavoriteDetail(true));
        setItemCart(id);
    }, [dispatch, id]);

    function handleReturn(e: any) {
        e.preventDefault();
        navigate(-1);
    }

    function handleFavorites(e: any) {
        e.preventDefault();
        setFavoriteDetail(!favoriteDetail);

        if (!favoriteDetail) {
            if (!localStorage.getItem("favorites")) {
                let favoritesLS = [];
                favoritesLS.push(detailGame);
                localStorage.setItem("favorites", JSON.stringify(favoritesLS));
            } else {
                let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
                if (favoritesLS?.filter((f: any) => f.id !== detailGame.id)) {
                    favoritesLS.unshift(detailGame);
                    localStorage.setItem("favorites", JSON.stringify(favoritesLS));
                }
            }
        } else {
            let favoritesLS = JSON.parse(localStorage.getItem("favorites") || '[]');
            let remFav = favoritesLS.filter((f: any) => {
                return f.id !== detailGame.id;
            });
            localStorage.setItem("favorites", JSON.stringify(remFav));
        }
        dispatch(getFavoritesLocalStorage())
    }

    return (
        <div className={s.detail_background}
            style={{
                backgroundImage: `url(${detailGame?.main_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            <div className={s.detail_container}>
                <div className={s.topLineDetail}>
                    <h3 onClick={(e) => handleReturn(e)} className={s.returnBtn}>Return</h3>
                    <i className={favoriteDetail ? s.favIconDetail : s.noFavIconDetail} onClick={(e) => handleFavorites(e)}>{favoriteDetail ? <MdFavorite /> : <MdFavoriteBorder />}</i>
                </div>
                <div className={s.detail_content}>
                    {/* carusel */}
                    <div className={s.flipCard}>
                        <div className={s.flipCardInner}>

                            <img src={detailGame?.main_image} className={s.detail_main_image} alt="main_image" />

                            <div className={s.details_labels_container}>
                                <div className={s.allTags}>
                                    <div className={s.detail_geners}>
                                        {
                                            detailGame?.geners?.map((g: any, i: number) => {
                                                return <span key={i + g} className={s.detail_tag}><p>{g}</p></span>
                                            })
                                        }
                                    </div>
                                    <div className={s.detail_tags}>
                                        {
                                            detailGame?.tags?.map((t: any, i: number) => {
                                                return <span key={i + t} className={s.detail_tag}><p>{t}</p></span>
                                            })
                                        }
                                    </div>
                                    <div className={s.detail_platform}>
                                        {
                                            detailGame?.platforms?.map((p: any, i: number) => {
                                                return <span key={i + p} className={s.detail_tag}><p>{p}</p></span>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={s.detail_content_right}>
                        <div>
                            <div className={s.titleDetail}>
                                <span className={s.nameGameDetail}>{detailGame?.name}</span>
                                {
                                    (detailGame.on_sale > 0)
                                    ? <div>
                                        <span className={s.priceGameDetail}>
                                            {detailGame?.price_with_sale} USD
                                        </span>
                                        <span style={{fontSize: '24px', textDecoration: 'line-through', marginLeft: '5px'}} className={s.priceGameDetail}>
                                            {detailGame?.price} USD
                                        </span>
                                        <span style={{margin: '0 5px'}}>-{detailGame.on_sale}%</span>
                                    </div>
                                    : <span className={s.priceGameDetail}>
                                            {detailGame?.price} USD
                                        </span>
                                }

                                
                            </div>
                            <div className={s.detailInfoNonImp}>
                                <p className={s.ratingGameDetail}>{new Array(detailGame?.rating).fill(false)?.map((el) => '⭐')}</p>
                                <p>Release Date: {detailGame?.released?.split("-").reverse().join("-")}</p>
                                <p className={s.detail_description}>{detailGame?.description}</p>
                            </div>
                        </div>
                        <div className={s.detail_btn_container}>
                            <button className={s.detail_btn}>Añadir a la lista de deseos</button>
                            <button className={s.detail_btn} onClick={(e) => handleCart(e, detailGame)} >
                                {
                                    (cart)
                                        ? <span>Sacar del carrito</span>
                                        : <span>Agregar al carrito</span>
                                }
                            </button>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}