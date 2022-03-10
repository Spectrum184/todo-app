import Cat from '../models/catModel';
import { ICat } from 'interfaces/cat';

const catService = {
    createCat: async (cat: ICat) => {
        try {
            const newCat = new Cat({
                ...cat,
            });

            await newCat.save();

            return newCat;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    updateCat: async (id: string, cat: Partial<ICat>) => {
        try {
            const updateCat = await Cat.findByIdAndUpdate(
                id,
                {
                    ...cat,
                },
                { new: true }
            );

            return updateCat;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    getCat: async (name: string) => {
        try {
            const cat = await Cat.findOne({
                name,
            });

            return cat;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    deleteCat: async (id: string) => {
        try {
            const cat = await Cat.findByIdAndDelete(id);

            if (!cat) return false;

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

export default catService;