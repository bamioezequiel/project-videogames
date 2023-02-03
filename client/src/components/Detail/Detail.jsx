import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailGame } from "../../redux/actions";
import s from "./Detail.module.css";
import useCart from "../../hooks/useCart";
import useLoading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";

export default function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailGame = useSelector((state) => state.detailGame);
  const { id } = useParams();
  const { user } = useAuth();
  const { cart, handleCart, setItemCart } = useCart();
  const { loading, setLoading, Loading } = useLoading();
  const [currentImage, setCurrentImage] = useState(detailGame?.main_image);
  const cartUser = useSelector((state)=>state.cart)

  useEffect(() => {
    /* if((user?.rol !== 'Owner' && user?.rol !== 'Admin') && !detailGame.active ) {
            navigate('/');
        } */
  }, []);

  useEffect(() => {
    setLoading(true);
    let res = dispatch(getDetailGame(id));
    setItemCart(id, cartUser);
    setCurrentImage(res.payload?.main_image);
  }, [dispatch, id]);

  useEffect(() => {
    if (Object.keys(detailGame).length) {
      setLoading(false);
    }
  }, [detailGame]);

  function handleImages(e) {
    e.preventDefault();
    setCurrentImage(e.target.id);
  }

  function handleReturn(e) {
    e.preventDefault();
    navigate(-1);
  }

  return loading ? (
    Loading()
  ) : (
    <div
      className={s.detail_background}
      style={{
        backgroundImage: `url(${detailGame?.main_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={s.detail_container}>
        <div className={s.topLineDetail}>
          <h3 onClick={(e) => handleReturn(e)} className={s.returnBtn}>
            Return
          </h3>
        </div>
        <div className={s.detail_content}>
          <div className={s.details_card_images}>
            <div className={s.flipCard}>
              <div className={s.flipCardInner}>
                <img
                  src={currentImage || detailGame?.main_image}
                  className={s.detail_main_image}
                  alt="main_image"
                />

                <div className={s.details_labels_container}>
                  <div className={s.allTags}>
                    <div className={s.detail_geners}>
                      {detailGame?.geners?.map((g, i) => {
                        return (
                          <span key={i + g} className={s.detail_tag}>
                            <p>{g}</p>
                          </span>
                        );
                      })}
                    </div>
                    <div className={s.detail_tags}>
                      {detailGame?.tags?.map((t, i) => {
                        return (
                          <span key={i + t} className={s.detail_tag}>
                            <p>{t}</p>
                          </span>
                        );
                      })}
                    </div>
                    <div className={s.detail_platform}>
                      {detailGame?.platforms?.map((p, i) => {
                        return (
                          <span key={i + p} className={s.detail_tag}>
                            <p>{p}</p>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={s.details_images_container}>
              {detailGame?.short_screenshots?.length &&
                detailGame?.short_screenshots?.map((urlImg) => {
                  return (
                    <img
                      key={urlImg}
                      src={urlImg}
                      id={urlImg}
                      onClick={handleImages}
                      className={s.details_image}
                      alt={urlImg}
                    />
                  );
                })}
            </div>
          </div>

          <div className={s.detail_content_right}>
            <div>
              <div className={s.titleDetail}>
                <span className={s.nameGameDetail}>{detailGame?.name}</span>
                {detailGame.on_sale > 0 ? (
                  <div>
                    <span className={s.priceGameDetail}>
                      {detailGame?.price_with_sale} USD
                    </span>
                    <span
                      style={{
                        fontSize: "24px",
                        textDecoration: "line-through",
                        marginLeft: "5px",
                      }}
                      className={s.priceGameDetail}
                    >
                      {detailGame?.price} USD
                    </span>
                    <span style={{ margin: "0 5px" }}>
                      -{detailGame.on_sale}%
                    </span>
                  </div>
                ) : (
                  <span className={s.priceGameDetail}>
                    {detailGame?.price} USD
                  </span>
                )}
              </div>
              <div className={s.detailInfoNonImp}>
                {console.log(detailGame.rating)}
                {/* <p className={s.ratingGameDetail}>{new Array(Math.floor(detailGame.rating)).fill(false)?.map((el) => '⭐')}</p> */}
                <p className={s.ratingGameDetail}>⭐⭐⭐</p>
                <p>
                  Release Date:{" "}
                  {detailGame?.released?.split("-").reverse().join("-")}
                </p>
                <p className={s.detail_description}>
                  {detailGame?.description}
                </p>
              </div>
            </div>
            <div className={s.detail_btn_container}>
              {console.log(cart)}
              <button
                className={s.detail_btn}
                onClick={(e) => handleCart(e, detailGame)}
              >
                {cart ? (
                  <span>Remove from cart</span>
                ) : (
                  <span>Add to cart</span>
                )}
              </button>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
