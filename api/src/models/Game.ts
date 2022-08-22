import { Model, Table, Column, DataType, DeletedAt } from 'sequelize-typescript';

@Table
export class Game extends Model {

    @Column({ type: DataType.STRING })
    name!: string
    
    @Column({ type: DataType.DATEONLY, defaultValue: Date })
    released!: string

    @Column({ type: DataType.STRING })
    main_image!: string
    
    @Column({ type: DataType.ARRAY(DataType.STRING) })
    short_screenshots!: Array<string>

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    rating!: number

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    price!: number

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    on_sale!: number

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    active!: boolean

    @Column({ type: DataType.INTEGER, defaultValue: 1 })
    stock!: number

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    features!: boolean

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    is_new!: boolean

    @Column({ type: DataType.STRING })
    saturated_color!: string

    @Column({ type: DataType.STRING })
    dominant_color!: string

    @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
    platforms!: Array<string>
    
    @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
    genres!: Array<string>
    
    @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
    tags!: Array<string>

    @DeletedAt
    @Column
    deletionDate!: Date;
    paranoid!: true;

}