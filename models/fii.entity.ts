import { Optional, Model, DataTypes } from 'sequelize'
import sequelize from '../db'

interface IFii {
    id: number,
    tipo: number,
    nome: string,
    data: Date,
    quantidade: number,
    valor: number,
    createdAt: Date,
    updatedAt: Date
}

export type FiiCreationAttributes = Optional<IFii, 'id'>

export class Fii extends Model<IFii, FiiCreationAttributes>{
    declare id: number;
    declare tipo: number;
    declare nome: string;
    declare data: Date;
    declare quantidade: number;
    declare valor: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Fii.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tipos',
                key: 'id'
            }
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valor: {
            type: DataTypes.DECIMAL(9,2),
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
        tableName: 'fiis',
        modelName: 'fii'
})