import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetailGame } from '../../redux/actions';
import s from './Detail.module.css';

export default function Detail() {
    const dispatch: any = useDispatch();
    const detailGame = useSelector((state: any) => state.detailGame);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetailGame(id));
    }, [dispatch, id]);

    return (
        <div className={s.detail_background}
            style={{
                backgroundImage: `url(${detailGame?.main_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
            <div className={s.detail_container}>
                <div className={s.detail_content}>
                    {/* carusel */}
                    <img src={detailGame?.main_image} className={s.detail_main_image} alt="main_image" />
                    <div className={s.detail_content_right}>
                        <div>
                            <span>{detailGame?.name}</span>
                            <p>{new Array(detailGame?.rating).fill(false)?.map((el) => '⭐')}</p>
                            <p>Release Date: {detailGame?.released?.split("-").reverse().join("-")}</p>
                            <p className={s.detail_description}>{detailGame?.description}</p>
                        </div>
                        <div>
                            <span>${detailGame?.price} USD</span>
                        </div>
                        <div className={s.detail_btn_container}>
                            <button className={s.detail_btn}>Comprar ahora</button>
                            <button className={s.detail_btn}>Agregar al carrito</button>
                        </div>
                        <br />
                        <div className={s.details_labels_container}>
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
        </div>
    )
}