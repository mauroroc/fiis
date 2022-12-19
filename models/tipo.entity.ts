import { Optional, Model, DataTypes } from 'sequelize'
import sequelize from '../db'

interface ITipo {
    id: number,
    nome: string,
    createdAt: Date,
    updatedAt: Date
}

export type TipoCreationAttributes = Optional<ITipo, 'id'>

export class Tipo extends Model<ITipo, TipoCreationAttributes>{
    declare id: number;
    declare nome: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Tipo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: 'tipos',
        modelName: 'tipo'
})