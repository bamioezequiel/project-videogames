import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import s from './ListGames.module.css';
import './../Table.css';
import { AiFillEdit } from 'react-icons/ai';
import { orderings } from './../../../utils/filtersAndOrders';
import { useState } from 'react';
export default function ListGames() {
    const allGames = useSelector((state: any) => state.allGames)
    const [games, setGames] = useState(allGames);
    const [orderType, setOrderType] = useState(false);

    const handleName = (e: any, typeOrder: boolean) => {
        e.preventDefault();
        let res = orderings(allGames, 'alpha', (typeOrder) ? 'asc' : 'desc' );
        setGames(res);
        setOrderType(!typeOrder)
    }
    const handleRating = (e: any, typeOrder: boolean) => {
        e.preventDefault();
        let res = orderings(allGames, 'rating', (typeOrder) ? 'asc' : 'desc' );
        setGames(res);
        setOrderType(!typeOrder)
    }
    const handlePrice = (e: any, typeOrder: boolean) => {
        e.preventDefault();
        let res = orderings(allGames, 'price', (typeOrder) ? 'asc' : 'desc' );
        setGames(res);
        setOrderType(!typeOrder)
    }
    const handleOnSale = (e: any, typeOrder: boolean) => {
        e.preventDefault();
        let res = orderings(allGames, 'onSale', (typeOrder) ? 'asc' : 'desc' );
        setGames(res);
        setOrderType(!typeOrder)
    }
    const handleStock = (e: any, typeOrder: boolean) => {
        e.preventDefault();
        let res = orderings(allGames, 'stock', (typeOrder) ? 'asc' : 'desc' );
        setGames(res);
        setOrderType(!typeOrder)
    }
    const handleFeatured = (e: any, typeOrder: boolean) => {
        e.preventDefault();
        let res = orderings(allGames, 'featured', (typeOrder) ? 'asc' : 'desc' );
        setGames(res);
        setOrderType(!typeOrder)
    }
    const handleIsNew = (e: any, typeOrder: boolean) => {
        e.preventDefault();
        let res = orderings(allGames, 'isNew', (typeOrder) ? 'asc' : 'desc' );
        setGames(res);
        setOrderType(!typeOrder)
    }
    const handleActive = (e: any, typeOrder: boolean) => {
        e.preventDefault();
        let res = orderings(allGames, 'active', (typeOrder) ? 'asc' : 'desc' );
        setGames(res);
        setOrderType(!typeOrder)
    }

    return (
        <div className={s.listGames_container}>
            <AdminNav />
            <div className='table_wrapper'>
                <table className='fl_table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th onClick={(e) => handleName(e, orderType)}>Name</th>
                            <th>Released</th>
                            <th onClick={(e) => handleRating(e, orderType)}>Rating</th>
                            <th onClick={(e) => handlePrice(e, orderType)}>Price</th>
                            <th onClick={(e) => handleOnSale(e, orderType)}>On sale</th>
                            <th onClick={(e) => handleStock(e, orderType)}>Stock</th>
                            <th onClick={(e) => handleFeatured(e, orderType)}>Featured</th>
                            <th onClick={(e) => handleIsNew(e, orderType)}>Is new</th>
                            <th onClick={(e) => handleActive(e, orderType)}>Active</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.length &&
                            games.map((g: any) => {
                                return (
                                    <tr key={"gamesList" + g.name}>
                                        <td>#{g.id}</td>
                                        <td>{g.name}</td>
                                        <td>{g.released}</td>
                                        <td>{g.rating}</td>
                                        <td>${g.price}</td>
                                        <td>{g.on_sale}%</td>
                                        <td>{g.stock}</td>
                                        <td>
                                            {
                                                (g.featured) ? (
                                                    <div className='fl_table_true'>Active</div>
                                                ) : (
                                                    <div className='fl_table_false'>Inactive</div>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                (g.is_new) ? (
                                                    <div className='fl_table_true'>Active</div>
                                                ) : (
                                                    <div className='fl_table_false'>Inactive</div>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                (g.active) ? (
                                                    <div className='fl_table_true'>Active</div>
                                                ) : (
                                                    <div className='fl_table_false'>Inactive</div>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <button className='fl_table_btn'>
                                                <AiFillEdit />
                                            </button>
                                        </td>
                                        <td>
                                            <button className='fl_table_btn'>
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}