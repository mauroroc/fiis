import { Sequelize } from 'sequelize'

//Ipconfig no powershell para pegar o IP do Windows dentro do WSL
const sequelize = new Sequelize('mysql://fii:12345678@172.22.32.1:3306/AdminJS', {
    dialect: 'mysql'
})

export default sequelize

