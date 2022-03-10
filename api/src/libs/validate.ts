import { ICat, SexEnum } from '../interfaces/cat';


export const CatValidator = {
    createCatValidator: (cat: ICat): Array<string> =>{
        const error: Array<string> = [];

        if (typeof cat.name !== "string") error.push('Cat name must be a string');

        if (cat.color && typeof cat.color !== "string") error.push('Cat color must be a string');

        if (cat.name === "") error.push("Cat name can't be empty")

        if (!Object.values(SexEnum).includes(cat.sex)) error.push("Cat sex not recognized");

        if (cat.age && Number(cat.age) === NaN) error.push('Age must be an integer');

        return error;
    },

    updateCatValidator: (cat: Partial<ICat>): Array<string> =>{
        const error: Array<string> = [];

        if (cat.name !== undefined) {
            if (typeof cat.name !== "string") error.push('Cat name is not a string');

            if (cat.name === "") error.push("Cat name can't be empty")
        }

        if (cat.age !== undefined){
            if (Number(cat.age) === NaN) error.push('Age must be an integer');
        }

        if (cat.color){
            if (typeof cat.color !== "string") error.push('Cat color must be a string');
        }

        if (cat.sex) {
            if (!Object.values(SexEnum).includes(cat.sex)) error.push("Cat's sex not recognized");
        }

        return error;
    }
}
export const catValidate = (cat: ICat): Array<string> => {
    const error = [];

    if (!cat.name) error.push('Cat name is not exist');

    if (!Object.values(SexEnum).includes(cat.sex)) error.push("Can't get sex");

    if (cat.name && Number(cat.name) === NaN) error.push('Age must be integer');

    return error;
};