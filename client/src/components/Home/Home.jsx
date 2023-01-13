import { useDispatch, useSelector } from "react-redux";
import { Payment } from "../../redux/actions";
import Card from "../Cards/MainCard/Card";
import Footer from "../Footer/Footer";
import Tab from "../Tab/Tab";
import Header from "./Header/Header";
import s from "./Home.module.css";

export default function Home() {
  const allGames = useSelector((state) => state.games);
  // const newsGames = allGames.filter((g, i: number) => g.is_news || i % 2 === 0);
  const amount = allGames.length;
  // let random1 = Math.floor(Math.random() * amount);
  // let random2 = Math.floor(Math.random() * amount);
  // let random3 = Math.floor(Math.random() * amount);
  let random1 = 2;
  let random2 = 22;
  let random3 = 32;
  const cart = useSelector( (state) => state.cart );

  return (
    <div className={s.home_container}>
      <Header />
      <div className={s.home_content}>
        {
          (amount > 0) && (
            <Card key={allGames[random1].id + allGames[random1].name + 'h'} game={allGames[random1]} />
          )
        }
        <div>
          {
            (amount > 0) && (
              <Card key={allGames[random2].id + allGames[random2].name + 'h'} game={allGames[random2]} size='small' />
            )
          }
          {
            (amount > 0) && (
              <Card key={allGames[random2].id + allGames[random3].name + 'h'} game={allGames[random3]} size='small' />
            )
          }
        </div>
      </div>
      <br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br />

      <Tab />
      <Footer />
    </div>
  );
}
