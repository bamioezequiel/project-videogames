import {
    Model, Column, Table, DataType
} from 'sequelize-typescript';

@Table
export class Cart extends Model {

    @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
    id!: string
    
    @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
    cart!: Array<Object>
    
    @Column({ defaultValue: 0, type: DataType.DOUBLE })
    amount!: number

}