import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from '../Cards/CardGame/Card';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';
import s from './Store.module.css';
import Pagination from '../Pagination/Pagination';
import Footer from '../Footer/Footer';

export default function Store() {
    const allGames = useSelector((state: any) => state.allGames);
    const filteredGames = useSelector((state: any) => state.filteredGames);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setgamesPerPage] = useState(12);
    const indexOfLastVideogame = currentPage * gamesPerPage;
    const indexOfFirstPackage = indexOfLastVideogame - gamesPerPage;
    const currentVideogame = filteredGames.length && filteredGames.slice(indexOfFirstPackage, indexOfLastVideogame);
    
    const paginado = (pageNumber : number) => {
      setCurrentPage(pageNumber);
    };

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
                <Pagination
                    gamesPerPage={gamesPerPage}
                    allGames={filteredGames.length} 
                    paginado={paginado}
                    currentPage={currentPage}
                  />
                {/* <span><MdArrowBackIosNew /></span>
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
                <span><MdArrowForwardIos /></span> */}
            </div>
            <div className={s.store_list}>
                {
                    currentVideogame.map( (g: any) => {
                        return <Card image={g.main_image} tag='BUY' />
                    })
                }
                
                {/* <Card image='https://imgur.com/IRINZJc.jpg' tag='BUY' /> */}
            </div>
            <Footer />
        </div>
    )
}