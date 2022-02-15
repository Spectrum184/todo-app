import { SexEnum } from 'interfaces/cat';
import mongoes from 'mongoose';

const catSchema = new mongoes.Schema({
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
    type: SexEnum,
  },
});

const Cats = mongoes.model('cats', catSchema);

export default Cats;
