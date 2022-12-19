import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import sequelize from './db'
import * as AdminJSSequelize from '@adminjs/sequelize'

import { Tipo } from './models/tipo.entity'
import { Fii } from './models/fii.entity'

require('dotenv').config()

const PORT = process.env.PORT_HOST

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database
})

const start = async () => {
    const adminJSOptions = {
        resources: [
            {
                resource: Tipo,
                options: {
                    properties: {
                        nome: {
                            isTitle: true
                        },
                        createdAt: {
                            isVisible: {
                                list: false, edit: false, create: false, show: true
                            }
                        },
                        updatedAt: {
                            isVisible: {
                                list: false, edit: false, create: false, show: true
                            }
                        }
                    }
                }
            },
            {
                resource: Fii,
                options: {                    
                    listProperties: ['id', 'nome', 'quantidade', 'data', 'valor', 'tipo'],
                    editProperties: ['nome', 'quantidade', 'data', 'valor', 'tipo'],
                    showProperties: ['id', 'nome', 'quantidade', 'data', 'valor', 'tipo', 'createdAt', 'updatedAt'],
                    properties: {
                        nome: {
                            isTitle: true
                        },
                        createdAt: {
                            isVisible: {
                                list: false, edit: false, create: false, show: true
                            }
                        },
                        updatedAt: {
                            isVisible: {
                                list: false, edit: false, create: false, show: true
                            }
                        }
                    }
                }
            },
        ],
        rootpath: '/admin',
        dashboard: {
            handle: async () => {
                console.log("Iniciando projeto")
            },
            component: AdminJS.bundle('./components/dashboard')
        },
        branding: {
            logo: 'https://www.b3.com.br/lumis-theme/br/com/bvmf/internet/theme/bvmf-internet/img/logo-b3-novo.svg',
            favicon: 'https://www.b3.com.br/lumis-theme/br/com/bvmf/internet/theme/bvmf-internet/img/logo-b3-novo.svg',
            companyName: 'Dashboard de Fundos Imobiliários'
        }
    }
    const app = express()
    sequelize.sync().then((result) => {
        console.log(result)
    }).catch((err) => console.log(err))

    const admin = new AdminJS(adminJSOptions)
    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)


    app.listen(PORT, () => {
        console.log("Projeto rodando")
    })
}

start()