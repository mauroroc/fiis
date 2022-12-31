import { Optional, Model, DataTypes } from 'sequelize'
import sequelize from '../db'

interface IDividendo {
    id: number,
    fii: number,
    data: Date,
    valor: number,
    createdAt: Date,
    updatedAt: Date
}

export type DividendosCreationAttributes = Optional<IDividendo, 'id'>

export class Dividendo extends Model<IDividendo, DividendosCreationAttributes>{
    declare id: number;
    declare fii: number;    
    declare data: Date;    
    declare valor: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Dividendo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fii: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'fiis',
                key: 'id'
            }
        },
        data: {
            type: DataTypes.DATE,
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
        tableName: 'dividendos',
        modelName: 'dividendo'
})