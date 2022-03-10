import { SexEnum } from '../interfaces/cat';
import mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        length: 50,
    },
    color: {
        type: String,
        default: 'red',
    },
    age: {
        type: Number,
    },
    sex: {
        type: String,
        enum: SexEnum,
        default: SexEnum.OTHER
    },
});

const Cats = mongoose.model('cats', catSchema);

export default Cats;