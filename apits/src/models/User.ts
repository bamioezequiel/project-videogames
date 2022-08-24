import {
    Model, Column, Table, DataType, DeletedAt, HasMany, BelongsTo, BelongsToMany, ForeignKey, BeforeCreate
} from 'sequelize-typescript';
import { Cart } from './Cart';
import { Favorites } from './Favorites';
import { Game } from './Game';
import { Order } from './Order';

@Table
export class User extends Model {

    @Column({ type: DataType.STRING, allowNull: false })
    username!: string
    
    @Column({ type: DataType.STRING, allowNull: false })
    firstname!: string

    @Column({ type: DataType.STRING, allowNull: false })
    lastname!: string

    @Column({ type: DataType.STRING, defaultValue: 'default image' })
    picture!: string

    @Column(DataType.STRING)
    date_of_birth!: string

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string

    @Column(DataType.STRING)
    password!: string

    @Column(DataType.STRING)
    phone!: string

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    active!: boolean

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    is_admin!: boolean

    @ForeignKey(() => Cart)
    @Column
    cartId!: number

    @BelongsTo(() => Cart)
    cart!: Cart

    @BeforeCreate
    static addGame(instance: Game) {
      // this will also be called when an instance is created
    }









    /* @ForeignKey(() => Cart)
    @Column
    user_id!: number

    @BelongsToMany(() => Game, () => Cart) */
    /* @ForeignKey(() => Cart)

    @BelongsTo(() => Cart, 'cart_id' )
    cart!: Cart
 */
    /* @HasMany( () => Order )
    orders!: Order[]
    
    @BelongsTo(() => Favorites )
    favs!: Favorites */
    
    @DeletedAt
    @Column
    deletionDate!: Date;
    paranoid!: true;
}