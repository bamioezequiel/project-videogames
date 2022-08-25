import { useState } from 'react';
import { useSelector } from "react-redux";
import Card from '../Cards/CardGame/Card';
import s from './Store.module.css';
import Pagination from '../Pagination/Pagination';
import Footer from '../Footer/Footer';

export default function Store() {
    const filteredGames = useSelector((state: any) => state.filteredGames);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(12);
    const indexOfLastVideogame = currentPage * gamesPerPage;
    const indexOfFirstPackage = indexOfLastVideogame - gamesPerPage;
    const currentVideogame = filteredGames?.length && filteredGames?.slice(indexOfFirstPackage, indexOfLastVideogame);

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
                    allGames={filteredGames?.length} 
                    paginado={paginado}
                    currentPage={currentPage}
                  />
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