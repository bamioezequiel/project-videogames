import { useEffect, useState } from 'react';
import { BsDashLg, BsPlusLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createGame, putGame, getDetailGame } from '../../../redux/actions';
import { validationsCreateGame } from '../../../utils/validations';
import AdminNav from '../AdminNav/AdminNav';
import s from './CreateGame.module.css';

export default function CreateGame() {
    const { id } = useParams();
    const dispatch: Function = useDispatch();
    const platforms = useSelector((state: any) => state.platforms);
    const tags = useSelector((state: any) => state.tags);
    const genres = useSelector((state: any) => state.genres);
    const currentDate = new Date().toISOString().split("T")[0];
    const updateGame = useSelector((state: any) => state.detailGame);
    const [input, setInput] = useState({
        name: '',
        description: '',
        released: currentDate.toString(),
        image0: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
        image6: '',
        short_screenshots: [],
        price: 0,
        on_sale: 0,
        stock: 0,
        featured: false,
        is_new: true,
        platforms: [],
        genres: [],
        tags: []
    });
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        released: '',
        main_image: '',
        image0: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
        image6: '',
        short_screenshots: '',
        price: '',
        on_sale: '',
        stock: '',
        featured: '',
        is_new: '',
        platforms: '',
        genres: '',
        tags: ''
    });

    useEffect(() => {
        if (Object.keys(updateGame)?.length) {
            setInput({
                name: updateGame.name,
                description: updateGame.description,
                released: updateGame.released,
                image0: updateGame.short_screenshots[0],
                image1: updateGame.short_screenshots[1],
                image2: updateGame.short_screenshots[2],
                image3: updateGame.short_screenshots[3],
                image4: updateGame.short_screenshots[4],
                image5: updateGame.short_screenshots[5],
                image6: updateGame.short_screenshots[6],
                short_screenshots: updateGame.short_screenshots,
                price: updateGame.price,
                on_sale: updateGame.on_sale,
                stock: updateGame.stock,
                featured: updateGame.featured,
                is_new: updateGame.is_new,
                platforms: updateGame.platforms,
                genres: updateGame.genres,
                tags: updateGame.tags
            });
        }
    }, [updateGame]);

    useEffect(() => {
        if(id) {
            dispatch(getDetailGame(id));
        } else {
            handleReset();
        }
    }, [dispatch, id])

    const handleChange = (e: any) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleCheck = (e: any, type: string) => {
        const value = e.target.name as never;
        if (type === 'tags') {
            if (e.target.checked && !input.tags.includes(value)) {
                setInput({
                    ...input,
                    tags: [...input.tags, value]
                })
            } else {
                setInput({
                    ...input,
                    tags: input.tags.filter((t: any) => t !== value)
                })
            }
        } else if (type === 'genres') {
            if (e.target.checked && !input.genres.includes(value)) {
                setInput({
                    ...input,
                    genres: [...input.genres, value]
                })
            } else {
                setInput({
                    ...input,
                    genres: input.genres.filter((g: any) => g !== value)
                })
            }
        } else if (type === 'platforms') {
            if (e.target.checked && !input.platforms.includes(value)) {
                setInput({
                    ...input,
                    platforms: [...input.platforms, value]
                })
            } else {
                setInput({
                    ...input,
                    platforms: input.platforms.filter((p: any) => p !== value)
                })
            }
        }

    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setErrors(validationsCreateGame({
            ...input,
        }));

        console.log(input)
        console.log(errors)
        if (errors.name.length || errors.description.length || errors.released.length || errors.short_screenshots.length || errors.price.length || errors.on_sale.length || errors.stock.length || errors.tags.length || errors.platforms.length || errors.genres.length) {
            console.log('error')
            return;
        }
        if (!input.name.length || !input.description.length || !input.released.length || !input.image0.length || !input.image1.length || !input.image2.length || !input.image3.length || !input.image4.length || !input.price || !input.on_sale || !input.stock || !input.tags.length || !input.platforms.length || !input.genres.length) {
            return;
        }

        const game = {
            name: input.name,
            description: input.description,
            released: input.released,
            main_image: input.image0,
            short_screenshots: [input.image0, input.image1, input.image2, input.image3, input.image4, input.image5, input.image6],
            price: input.price,
            on_sale: input.on_sale,
            stock: input.stock,
            featured: input.featured,
            is_new: input.is_new,
            platforms: input.platforms,
            genres: input.genres,
            tags: input.tags
        }

        if (id) {
            dispatch(putGame({...game, id}))
            alert('The game was updated');
        } else {
            dispatch(createGame(game))
            alert('The game was created');
            setInput({
                name: '',
                description: '',
                released: currentDate.toString(),
                image0: '',
                image1: '',
                image2: '',
                image3: '',
                image4: '',
                image5: '',
                image6: '',
                short_screenshots: [],
                price: 0,
                on_sale: 0,
                stock: 0,
                featured: false,
                is_new: true,
                platforms: [],
                genres: [],
                tags: []
            });
        }
    }

    const handleReset = () => {
        setInput({
            name: '',
            description: '',
            released: currentDate.toString(),
            image0: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            image5: '',
            image6: '',
            short_screenshots: [],
            price: 0,
            on_sale: 0,
            stock: 0,
            featured: false,
            is_new: true,
            platforms: [],
            genres: [],
            tags: []
        });
    }

    return (
        <div className={s.createGame_container}>
            <AdminNav />
            <form className={s.createGame_form_container}>
                <div className={s.form_input_group}>
                    <label htmlFor="name" className={s.form_input_label}>Name</label>
                    <input type="text"
                        id='name'
                        name='name'
                        value={input.name}
                        onChange={handleChange}
                        placeholder='Name...'
                        className={s.form_input} />
                    {
                        errors.name && <span>{errors.name}</span>
                    }
                </div>
                <div className={s.form_input_group}>
                    <label htmlFor="price" className={s.form_input_label}>Price</label>
                    <input type="number"
                        id='price'
                        name='price'
                        value={input.price}
                        onChange={handleChange}
                        min={0}
                        placeholder='Price...'
                        className={s.form_input} />
                    {
                        errors.price && <span>{errors.price}</span>
                    }

                </div>
                <div className={s.form_input_group}>
                    <label htmlFor="on_sale" className={s.form_input_label}>On sale</label>
                    <input type="number"
                        id='on_sale'
                        name='on_sale'
                        value={input.on_sale}
                        onChange={handleChange}
                        min={0}
                        max={100}
                        placeholder='On sale...'
                        className={s.form_input} />
                    {
                        errors.on_sale && <span>{errors.on_sale}</span>
                    }

                </div>
                <div className={s.form_input_group}>
                    <label htmlFor="stock" className={s.form_input_label}>Stock</label>
                    <input type="number"
                        id='stock'
                        name='stock'
                        value={input.stock}
                        onChange={handleChange}
                        min={0}
                        placeholder='Stock...'
                        className={s.form_input} />
                    {
                        errors.stock && <span>{errors.stock}</span>
                    }

                </div>
                <div className={s.form_input_group}>
                    <label htmlFor="stock" className={s.form_input_label}>Released</label>
                    <input type="date"
                        id='released'
                        name='released'
                        onChange={handleChange}
                        defaultValue={currentDate}
                        value={input.released}
                        max={currentDate}
                        className={s.form_input} />
                    {
                        errors.released && <span>{errors.released}</span>
                    }
                </div>
                <div className={s.form_input_group}>
                    <label htmlFor="features" className={s.form_input_label}>Features</label>
                    <select id='features' name='featured' onChange={handleChange} className={s.form_input} >
                        <option disabled value="x">Features</option>
                        <option selected={input.featured ? true : false} value="true">Yes</option>
                        <option selected={input.featured ? false : true} value="false">No</option>
                    </select>
                </div>
                <div className={s.form_textarea_group}>
                    <label htmlFor="features" className={s.form_input_label}>Description</label>
                    <textarea name='description'
                        onChange={handleChange}
                        value={input.description}
                        className={s.form_textarea}
                        placeholder='Description...' ></textarea>
                    {
                        errors.description && <span>{errors.description}</span>
                    }
                </div>
                <div className={s.form_images_group}>
                    <label className={s.form_input_label}>Images</label>
                    <div>

                        <input
                            name='image0'
                            value={input.image0}
                            onChange={handleChange}
                            placeholder={`Image 1...`}
                            className={s.form_input}
                            type="text" />
                        <input
                            name='image1'
                            value={input.image1}
                            onChange={handleChange}
                            placeholder={`Image 2...`}
                            className={s.form_input}
                            type="text" />
                        <input
                            name='image2'
                            value={input.image2}
                            onChange={handleChange}
                            placeholder={`Image 3...`}
                            className={s.form_input}
                            type="text" />
                        <input
                            name='image3'
                            value={input.image3}
                            onChange={handleChange}
                            placeholder={`Image 4...`}
                            className={s.form_input}
                            type="text" />
                        <input
                            name='image4'
                            value={input.image4}
                            onChange={handleChange}
                            placeholder={`Image 5...`}
                            className={s.form_input}
                            type="text" />
                        <input
                            name='image5'
                            value={input.image5}
                            onChange={handleChange}
                            placeholder={`Image 6...`}
                            className={s.form_input}
                            type="text" />
                        <input
                            name='image6'
                            value={input.image6}
                            onChange={handleChange}
                            placeholder={`Image 7...`}
                            className={s.form_input}
                            type="text" />
                    </div>
                    {
                        errors.short_screenshots && <span>{errors.short_screenshots}</span>
                    }
                </div>
                <div className={s.form_labels_container}>
                    <div className={s.form_checkbox_group}>
                        <label className={s.form_input_label}>Platforms ({input.platforms?.length})</label>

                        <div className={s.form_labels}>
                            {
                                platforms?.length > 0 && platforms.map((p: any) => {
                                    return (
                                        <div className={s.form_label}>
                                            <input type="checkbox"
                                                name={p}
                                                checked={input.platforms.includes(p as never)}
                                                onChange={(e) => handleCheck(e, 'platforms')}
                                                className={s.form_label_check}
                                                id={p} />
                                            <label htmlFor={p}>{p}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            errors.platforms && <span>{errors.platforms}</span>
                        }
                    </div>
                    <div className={s.form_checkbox_group}>
                        <label className={s.form_input_label}>Tags ({input.tags?.length})</label>

                        <div className={s.form_labels}>
                            {
                                tags?.length > 0 && tags.map((t: any) => {
                                    return (
                                        <div className={s.form_label}>
                                            <input type="checkbox"
                                                id={t}
                                                name={t}
                                                checked={input.tags.includes(t as never)}
                                                className={s.form_label_check}
                                                onChange={(e) => handleCheck(e, 'tags')} />
                                            <label htmlFor={t}>{t}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            errors.tags && <span>{errors.tags}</span>
                        }
                    </div>
                    <div className={s.form_checkbox_group}>

                        <label className={s.form_input_label}>Genres ({input.genres?.length})</label>
                        <div className={s.form_labels}>
                            {
                                genres?.length > 0 && genres.map((g: any) => {
                                    return (
                                        <div className={s.form_label}>
                                            <input type="checkbox"
                                                name={g}
                                                checked={input.genres.includes(g as never)}
                                                className={s.form_label_check}
                                                onChange={(e) => handleCheck(e, 'genres')}
                                                id={g} />
                                            <label htmlFor={g}>{g}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            errors.genres && <span>{errors.genres}</span>
                        }
                    </div>
                </div>

                <button onClick={handleReset} style={id ? {backgroundColor: '#ffffff33'} : undefined} disabled={id ? true : false} className={s.form_btn}>Reset</button>
                <button onClick={handleSubmit} className={s.form_btn}>{(id) ? 'Update' : 'Create'}</button>
            </form>
        </div>
    )
}