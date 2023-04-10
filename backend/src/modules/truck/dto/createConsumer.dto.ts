import {CreateProfileDto} from "./createProfile.dto";

export class CreateConsumerDto {
    nick: string;
    deleted?: boolean;
    profile: CreateProfileDto
}