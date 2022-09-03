import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import s from './ListGames.module.css';
import './../Table.css';
import { AiFillEdit } from 'react-icons/ai';

export default function ListGames() {
    const allGames = useSelector((state: any) => state.allGames)

    return (
        <div className={s.listGames_container}>
            <AdminNav />
            <div className='table_wrapper'>
                <table className='fl_table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Released</th>
                            <th>Rating</th>
                            <th>Price</th>
                            <th>On sale</th>
                            <th>Stock</th>
                            <th>Featured</th>
                            <th>Is new</th>
                            <th>Active</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allGames.length &&
                            allGames.map((g: any) => {
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