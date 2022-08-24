import {
    Model, Column, Table, DataType, BelongsTo, HasMany, ForeignKey, BelongsToMany
} from 'sequelize-typescript';
import { Game } from './Game';
import { User } from './User';

@Table
export class Cart extends Model {
    
    // @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
    // cart!: Array<Object>
    
    @Column({ defaultValue: 0, type: DataType.DOUBLE })
    amount!: number

    @HasMany(() => User)
    userId!: User
    
    @HasMany(() => Game)
    games!: Game[]













    /* @ForeignKey(() => User)

    @BelongsToMany( () => Cart, () => User )
    user!: User

    @ForeignKey(() => Game)

    @BelongsToMany( () => Cart, () => Game )
    games!: Game[] */

   /*  @ForeignKey(() => User)

    @BelongsToMany(() => User, 'user_id' )
    user!: User

    @ForeignKey(() => Game)

    @BelongsToMany( () => Game, 'game_id' )
    games!: Game[] */
    

}