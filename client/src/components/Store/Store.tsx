import { useState } from 'react';
import { useSelector } from "react-redux";
import Card from '../Cards/CardGame/Card';
import s from './Store.module.css';
import Pagination from '../Pagination/Pagination';
import Footer from '../Footer/Footer';
import SearchBar from '../SearchBar/SearchBar';
import View from '../View/View';

export default function Store() {
    const tags = useSelector((state: any) => state.tags);
    const platforms = useSelector((state: any) => state.platforms);
    const genres = useSelector((state: any) => state.genres);
    const filteredGames = useSelector((state: any) => state.filteredGames);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setgamesPerPage] = useState(12);
    const indexOfLastVideogame = currentPage * gamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - gamesPerPage;
    const currentVideogame = filteredGames?.length && filteredGames?.slice(indexOfFirstVideogame, indexOfLastVideogame);

    const paginado = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={s.store_container}>
            <div className={s.store_filter}>
                <select value='x'>
                    <option value="x" disabled>Choose a tag</option>
                    {
                        tags.length > 0 && tags.map((tag: any) => {
                            return <option value={tag}>{tag}</option>
                        })
                    }
                </select>
                <select value='x'>
                    <option value="x" disabled>Choose a platform</option>
                    {
                        platforms.length > 0 && platforms.map((platform: any) => {
                            return <option value={platform}>{platform}</option>
                        })
                    }
                </select>
                <select value='x'>
                    <option value="x" disabled>Choose a genre</option>
                    {
                        genres.length > 0 && genres.map((genre: any) => {
                            return <option value={genre}>{genre}</option>
                        })
                    }
                </select>
                {/* <span>Rating</span> */}
                <span>Sort</span>
                <span>Order</span>
                <span><SearchBar /></span>
            </div>
            <div className={s.store_pagination_view_container}>
                <div className={s.viewContainer}></div>
                <div className={s.store_pagination}>
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
                            filteredGames={filteredGames}
                            indexOfFirstVideogame={indexOfFirstVideogame}
                            setgamesPerPage={setgamesPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />}
                </div>
            </div>
            <div className={s.store_list}>
                {
                    currentVideogame?.length && currentVideogame?.map((g: any) => {
                        return <Card id={g.id} name={g.name} description={g.description} price={g.price} image={g.main_image} tag='BUY' />
                    })
                }
            </div>
            <Footer />
        </div>
    )
}