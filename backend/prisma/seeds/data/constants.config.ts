import {_bcrypt} from "../../../src/common/utils";

export const initialData = {
    name: 'admin',
    email: 'admin@gmail.com',
    password: _bcrypt('12345'),
    activated: true,
}
