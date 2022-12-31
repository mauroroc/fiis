import AdminJS, { useRecord } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import sequelize from './db'
import * as AdminJSSequelize from '@adminjs/sequelize'
const bcrypt = require('bcrypt');
const cors = require('cors')

import { Tipo } from './models/tipo.entity'
import { Fii } from './models/fii.entity'
import { Dividendo } from './models/dividendo.entity'
import { Usuario } from './models/usuario.entity'

import { DividendoRoutes } from './routes/dividendo.route'

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
            {
                resource: Dividendo,
                options: {                    
                    listProperties: ['id', 'fii', 'data', 'valor'],
                    editProperties: ['fii', 'data', 'valor'],
                    showProperties: ['id', 'fii', 'data', 'valor', 'createdAt', 'updatedAt'],
                    properties: {
                        fii: {
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
                resource: Usuario,
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
                        },
                        encryptedPassword: {
                            isVisible: {
                                list: false, edit: false, create: false, show: false
                            }
                        },
                        password: {
                            type: 'password',
                            isVisible: {
                                list: false, edit: true, create: true, show: false
                            }
                        }
                    },
                    actions: {
                        new: {
                            before: async function(request: any) {                                
                                if(request.payload.password){
                                    request.payload.encryptedPassword = await bcrypt.hash(request.payload.password, 10)                                    
                                }
                                return request
                            }
                        },
                        edit: {
                            before: async function(request: any) {
                                if(request.payload.password){
                                    request.payload.encryptedPassword = await bcrypt.hash(request.payload.password, 10)
                                }
                                return request
                            }
                        }
                    }
                }
            }
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
        console.log('')
    }).catch((err) => console.log(err))

    const admin = new AdminJS(adminJSOptions)
    //const adminRouter = AdminJSExpress.buildRouter(admin)
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin, {
            authenticate: async function(email, password) {
                const user = await Usuario.findOne({
                    where: {
                        email: email
                    }
                })                
                if(user){
                    const verifica = await bcrypt.compare(password, user.encryptedPassword)
                    if(verifica){
                        return user
                    }
                    return false
                }
            },
            cookieName: 'adminjs',
            cookiePassword: '32432432#@$#@$#@1213424'
        }, null
    )
    app.use(admin.options.rootPath, adminRouter)
    app.use(express.json())
    app.use(cors())
    DividendoRoutes(app)

    app.listen(PORT, () => {
        console.log("Projeto rodando")
    })
}

start()