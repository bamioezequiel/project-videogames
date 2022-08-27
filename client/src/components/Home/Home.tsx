import React from "react";
import { useSelector } from "react-redux";
import Card from "../Cards/MainCard/Card";
import Footer from "../Footer/Footer";
import Tab from "../Tab/Tab";
import Header from "./Header/Header";
import s from "./Home.module.css";

export default function Home() {
  const allGames = useSelector((state: any) => state.allGames);
  const newsGames = allGames.filter( (g: any, i: number) => g.is_news || i % 2 === 0 );
  
  return (
    <div className={s.home_container}>
      <Header />
      <div className={s.home_content}>
      {
        newsGames.length > 0 
        ? newsGames.slice(0, 1).map( (g: any) => <Card id={g.id} name={g.name} description={g.description} price={g.price} image={g.main_image} tag='NEWS' /> )
        : <span>No hay nuevos juegos para mostrar</span> 
      }
        <div>
        {
          newsGames.length > 0 
          ? newsGames.slice(1, 3).map( (g: any) => <Card id={g.id} name={g.name} description={g.description} price={g.price} size='small' image={g.main_image} tag='NEWS' /> )
          : <span>No hay nuevos juegos para mostrar</span> 
        }
        </div>
      </div>
      <br /><br /><br /><br /><br />
      <Tab />
      <Footer />
    </div>
  );
}
