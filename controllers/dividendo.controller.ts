import { Dividendo } from '../models/dividendo.entity'

export class DividendoController {
    
    static async getAll(req: any,res: any) {
        try {
            const dividendos = await Dividendo.findAll()            
            res.send(dividendos)
        } catch (error: any) {
            res.status(500).send(error.message)
        }
    }

    static async getOne(req: any,res: any) {
        const { id } = req.params
        try {
            const dividendo = await Dividendo.findOne({
                where: {
                    id: Number(id)
                }
            })           
            res.send(dividendo)
        } catch (error: any) {
            res.status(500).send(error.message)
        }
    }

    static async addItem(req: any,res: any) {
        const newItem = req.body
        //São permitidos inserções de dividendos com mesmo valor e data        
        try {
            await Dividendo.create(newItem)            
            res.status(200).send("Dividendo adicionado com sucesso")
        } catch (error: any) {
            res.status(500).send(error.message)
        }
    }

    static async editItem(req: any,res: any) {
        const { id } = req.params
        const updateItem = req.body
        if(await Dividendo.findOne({ where: { id: Number(id) }})) 
        {
            try {
                await Dividendo.update(updateItem, { where: { id: Number(id) } })            
                res.status(200).send("Dividendo atualizado com sucesso")
            } catch (error: any) {
                res.status(500).send(error.message)
            }
        }             
        res.status(404).send("Dividendo não existe para ser atualizado")
    }

    static async delItem(req: any,res: any) {
        const { id } = req.params
        if(await Dividendo.findOne({ where: { id: Number(id) }})) 
        {
            try {
                await Dividendo.destroy({ where: { id: Number(id) } })            
                res.status(200).send("Dividendo excluído com sucesso")
            } catch (error: any) {
                res.status(500).send(error.message)
            }
        }
        res.status(404).send("Dividendo não existe para ser excluído")
    }
}