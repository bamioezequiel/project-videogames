import {
    Model, Column, Table, PrimaryKey, DataType, Unique, AllowNull
} from 'sequelize-typescript';

@Table
export class User extends Model {

    @Column(DataType.STRING)
    name!: string

    @Column(DataType.STRING)
    lastname!: string

    @Column(DataType.STRING)
    picture!: string

    @Column(DataType.STRING)
    date_of_birth!: string

    @Column(DataType.STRING)
    email!: string

    @Column(DataType.STRING)
    password!: string

    @Column(DataType.STRING)
    phone!: string

    @Column({ defaultValue: true })
    active!: boolean

    @Column({ defaultValue: false })
    is_admin!: boolean
// Crear tablas para fav y carrito
    @Column(DataType.STRING)
    favorites!: string

    @Column(DataType.STRING)
    cart!: string

}