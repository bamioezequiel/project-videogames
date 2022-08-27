import { useState } from 'react';
import { useSelector } from "react-redux";
import Card from '../Cards/CardGame/Card';
import s from './Store.module.css';
import Pagination from '../Pagination/Pagination';
import Footer from '../Footer/Footer';
import SearchBar from '../SearchBar/SearchBar';
import View from '../View/View';

export default function Store() {
    const filteredGames = useSelector((state: any) => state.filteredGames);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setgamesPerPage] = useState(12);
    const indexOfLastVideogame = currentPage * gamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - gamesPerPage;
    const currentVideogame = filteredGames?.length && filteredGames?.slice(indexOfFirstVideogame, indexOfLastVideogame);

    const paginado = (pageNumber : number) => {
      setCurrentPage(pageNumber);
    };

    return (
        <div className={s.store_container}>
            <div className={s.store_filter}>
                <span>Tag</span>
                <span>Geners</span>
                <span>Rating</span>
                <span>Sort</span>
                <span>Order</span>
                <span><SearchBar/></span>
            </div>
            <div className={s.store_pagination_view_container}>
                <div className={s.viewContainer}></div>
                <div  className={s.store_pagination}>
                    <Pagination
                        gamesPerPage={gamesPerPage}
                        allGames={filteredGames?.length} 
                        paginado={paginado}
                        currentPage={currentPage}
                    />
                </div>
                <div className={s.viewContainer}>
                    {filteredGames.length > 0 && 
                    <View 
                        // filteredGames={filteredGames} 
                        // indexOfFirstVideogame={indexOfFirstVideogame}
                        // setgamesPerPage={setgamesPerPage}
                        // currentPage={currentPage}
                        // setCurrentPage={setCurrentPage}
                    />}
                </div>
            </div>
            <div className={s.store_list}>
                {
                    currentVideogame?.length && currentVideogame?.map( (g: any) => {
                        return <Card id={g.id} name={g.name} description={g.description} price={g.price} image={g.main_image} tag='BUY' />
                    }) 
                }
                
            </div>
            <Footer />
        </div>
    )
}