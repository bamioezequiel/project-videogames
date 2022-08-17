import React from "react";
import Card from "../Cards/MainCard/Card";
import Footer from "../Footer/Footer";
import Tab from "../Tab/Tab";
import Header from "./Header/Header";
import s from "./Home.module.css";

export default function Home() {
  return (
    <div className={s.home_container}>
      <Header />
      <div className={s.home_content}>
        <Card image='https://imgur.com/IRINZJc.jpg' />
        <div>
          <Card size='small' image='https://imgur.com/IRINZJc.jpg' />
          <Card size='small' image='https://imgur.com/IRINZJc.jpg' />  
        </div>
      </div>
      <br /><br /><br /><br /><br />
      <Tab />
      <hr />
      <Footer />
    </div>
  );
}
