import {ContactEntity} from "./contact.entity";
import {ConsumerEntity} from "./consumer.entity";

export class ConsumerProfileEntity {
    id: null;
    inn?: string;
    name: string;
    email?: string;
    telegram?: string;
    addr_register?: string;
    addr_postal?: string;
    contacts?: ContactEntity[];
    Consumer?: ConsumerEntity[];
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
}