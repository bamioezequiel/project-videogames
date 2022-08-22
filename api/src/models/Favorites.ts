import {
    Model, Column, Table, DataType
} from 'sequelize-typescript';

@Table
export class Favorites extends Model {

    @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
    id!: string
    
    @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
    cart!: Array<Object>

}