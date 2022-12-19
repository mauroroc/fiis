import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('mysql://fii:12345678@172.21.64.1:3306/AdminJS', {
    dialect: 'mysql'
})

export default sequelize