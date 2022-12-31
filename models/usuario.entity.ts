import { Optional, Model, DataTypes } from 'sequelize'
import sequelize from '../db'

interface IUsuario {
    id: number;
    nome: string;
    email: string;
    username: string;
    encryptedPassword: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UsuarioCreationAttributes = Optional<IUsuario, 'id'>

export class Usuario extends Model<IUsuario, UsuarioCreationAttributes>{
    declare id: number;
    declare nome: string;
    declare email: string;
    declare username: string;
    declare encryptedPassword: string;
    declare role: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        encryptedPassword: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user'
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
    }, 
    {
        sequelize,
        tableName: 'usuarios',
        modelName: 'usuario'
})