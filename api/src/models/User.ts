import {
    Model, Column, Table, DataType, DeletedAt
} from 'sequelize-typescript';

@Table
export class User extends Model {

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string

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
    
    @DeletedAt
    @Column
    deletionDate!: Date;
    paranoid!: true;
}