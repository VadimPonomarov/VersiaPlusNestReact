import {ConsumerProfileEntity} from "./profile.entity";

export class ConsumerEntity {
    id: number;
    nick: string;
    profile: ConsumerProfileEntity
    createdAt: Date;
    updatedAt: Date;
}