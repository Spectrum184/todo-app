import catService from '../services/catService';
import { Request, Response } from 'express';
import { ICat } from '../interfaces/cat';
import { catValidate, CatValidator } from '../libs/validate';

const catCtrl = {
    get: async (req: Request, res: Response) => {
        try {
            const { name } = req.params;
            const cat = await catService.getCat(name);

            if (!cat) return res.status(400).json({ msg: 'Not Found!' });

            return res.status(200).json(cat);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const cat: ICat = req.body;

            const arrError = catValidate(cat);

            if (arrError.length > 0) return res.status(400).json(arrError);

            const newCat = await catService.createCat(cat);

            return res.status(200).json(newCat);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    update: async (req: Request, res: Response) =>{
        try{
            const cat: Partial<ICat> = req.body;

            const arrError = CatValidator.updateCatValidator(cat);

            if(arrError.length > 0) return res.status(400).json(arrError);

            const newCat = await catService.updateCat(req.params.id,cat);
            return res.status(200).json(newCat);
        } catch(error){
            return res.status(500).json(error);
        }
    },

    delete: async (req: Request, res: Response) =>{
        try {
            const  id  = req.params.id;

            const cat = await catService.deleteCat(id);

            if (!cat) return res.status(400).json({ msg: 'Not Found!' });

            return res.status(200).json({deleted:cat});
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};

export default catCtrl;