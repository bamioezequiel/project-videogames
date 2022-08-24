import {
    Model, Column, Table, DataType, UpdatedAt, CreatedAt, HasMany, BelongsTo
} from 'sequelize-typescript';
import { Game } from './Game';
import { User } from './User';

@Table
export class Order extends Model {

    @Column({ type: DataType.DATE, defaultValue: Date })
    date!: Date
    
    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    total!: number

    @Column({ type: DataType.STRING/* ENUM('in cart', 'pending', 'paid', 'cancel') */, defaultValue: 'in cart' })
    status!: string

	timestamps!: false
}