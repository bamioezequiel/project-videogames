import { useState } from 'react';
import { BsDashLg, BsPlusLg } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav';
import s from './CreateGame.module.css';

export default function CreateGame() {
    const platforms = useSelector((state: any) => state.platforms)
    const tags = useSelector((state: any) => state.tags)
    const genres = useSelector((state: any) => state.genres)
    const [input, setInput] = useState({
        images: ['']
    })

    const handleAddImage = (e: any) => {
        e.preventDefault();
        if (input.images?.length < 3) {
            setInput({ ...input, images: [...input.images, ""] });
        }
    };
    const handleRemoveImage = (e: any) => {
        e.preventDefault();
        const images = input.images;
        if (images.length > 0) images.pop();
        setInput({ ...input, images: images });
    }

    return (
        <div className={s.createGame_container}>
            <AdminNav />
            <form className={s.createGame_form_container}>
                <input type="text" className={s.form_input} placeholder='Name...' />
                <input type="number" min={0} className={s.form_input} placeholder='Price...' />
                <input type="number" min={0} max={100} className={s.form_input} placeholder='On sale...' />
                <input type="number" min={0} className={s.form_input} placeholder='Stock...' />
                <input type="date" className={s.form_input} />
                <select className={s.form_input} >
                    <option value="x">Features</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <textarea className={s.form_textarea} placeholder='Description...' ></textarea>
                <div>
                    <input type="text" className={s.form_input} placeholder='Main image...' />
                    <button className={s.form_input_btn} onClick={(e) => handleAddImage(e)} >
                        <BsPlusLg />
                    </button>
                    <button className={s.form_input_btn} onClick={(e) => handleRemoveImage(e)} >
                        <BsDashLg />
                    </button>
                </div>
                <div>
                    {input.images?.map((i: any, index) => {
                        return (
                            <div key={i + index} >
                                <input
                                    id={`${index}`}
                                    name={`images${index}`}
                                    value={input.images[i]}
                                    placeholder={`images ${index + 1}...`}
                                    className={s.form_input}
                                    type="text" />
                            </div>
                        );
                    })}
                </div>
                <div className={s.form_labels_container}>
                    <div className={s.form_labels}>
                        {
                            platforms?.length > 0 && platforms.map((p: any) => {
                                return (
                                    <div className={s.form_label}>
                                        <input type="checkbox" className={s.form_label_check} id={p} />
                                        <label htmlFor={p}>{p}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={s.form_labels}>
                        {
                            tags?.length > 0 && tags.map((t: any) => {
                                return (
                                    <div className={s.form_label}>
                                        <input type="checkbox" id={t} />
                                        <label htmlFor={t}>{t}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={s.form_labels}>
                        {
                            genres?.length > 0 && genres.map((g: any) => {
                                return (
                                    <div className={s.form_label}>
                                        <input type="checkbox" id={g} />
                                        <label htmlFor={g}>{g}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <button className={s.form_btn}>Reset</button>
                <button type="submit" className={s.form_btn}>Create</button>
            </form>
        </div>
    )
}