import { DividendoController } from '../controllers/dividendo.controller'

export const DividendoRoutes = (app: any) => {    
    app.get('/dividendo', DividendoController.getAll)
    app.get('/dividendo/:id', DividendoController.getOne)
    app.post('/dividendo', DividendoController.addItem)
    app.put('/dividendo/:id', DividendoController.editItem)
    app.delete('/dividendo/:id', DividendoController.delItem)
}