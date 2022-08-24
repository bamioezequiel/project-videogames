import {
    Model, Column, Table, DataType, BelongsTo, HasMany
} from 'sequelize-typescript';
import { Game } from './Game';
import { User } from './User';

@Table
export class Favorites extends Model {

    @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
    id!: string
    
    // @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
    // favs!: Array<Object>

   
}