import {
    Injectable,
    NotAcceptableException,
} from '@nestjs/common';
import {CreateUserDto, JwtDto, JwtPayloadDto, LogInDto} from './dto';
import {PrismaService} from '../../core/prisma.service';
import {JwtEnum, RoleEnum} from '../../common/constants';
import {RoleEntity, UserEntity} from './dto/entities';
import {_bcrypt, _bcryptCompare} from '../../common/utils';
import {JwtProvider} from './providers';
import {MailerService} from '@nestjs-modules/mailer';
import * as process from 'process';
import {join} from 'node:path';
import config from '../../config/configuration';
import {User} from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtProvider: JwtProvider,
        private readonly mailerService: MailerService,
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<void> {
        try {
            const isExist = await this.prismaService.user.findUnique({
                where: {email: createUserDto.email},
            });

            if (!!isExist) throw new Error('User`s email should be unique');

            const data: CreateUserDto = {
                name: createUserDto.name,
                email: createUserDto.email,
                password: _bcrypt(createUserDto.password),
            };

            const user = await this.prismaService.user.create({
                data: {...data, roles: {create: {name: RoleEnum.USER}}},
            });

            const activationToken = await this.jwtProvider.getJwt(JwtEnum.ACTIVATE, {
                name: user.name,
                email: user.email,
            });

            await this.mailerService
                .sendMail({
                    context: {
                        message: join(
                            process.env.MAILER_ACTIVATION_LINK,
                            activationToken.token,
                        ),
                    },
                    to: user.email,
                    from: 'pvs.versia@gmail.com',
                })

        } catch (e) {
            console.log(e.message);
            throw new Error(e.message);
        }
    }

    async activateUser(jwt: JwtDto): Promise<void> {
        try {
            const isValid: JwtPayloadDto = await this.jwtProvider.getIsJwtValid(jwt);

            const isRegistered = await this.prismaService.token.delete({
                where: {token: jwt.token},
            });

            if (!isValid || !isRegistered) throw new NotAcceptableException();

            await this.prismaService.user.update({
                where: {email: isValid.email},
                data: {activated: true},
            });

        } catch (e) {
            console.log(e.message);
            throw new Error(e.message);
        }
    }

    async logIn(loginDto: LogInDto): Promise<JwtDto[]> {
        try {
            const isExist = await this.prismaService.user.findUnique({
                where: {email: loginDto.email},
                include: {roles: {select: {name: true}}},
            });

            if (!isExist || !isExist.activated) throw new NotAcceptableException();

            const isValid = _bcryptCompare(loginDto.password, isExist.password);

            if (!isValid) throw new NotAcceptableException();

            const jwtPayload: JwtPayloadDto = {
                name: isExist.name,
                email: isExist.email,
            };

            return this.jwtProvider.getTokenPair(jwtPayload);

        } catch (e) {
            console.log(e.message);
            throw new Error(e.message);
        }
    }

    refreshTokenPair(jwt: JwtDto): JwtDto[] {
        try {
            if (jwt.type !== JwtEnum.REFRESH) throw new NotAcceptableException();

            const isValid = this.jwtProvider.getIsJwtValid(jwt);

            this.jwtProvider.removeJwtFromRegister(jwt);

            if (!isValid) throw new NotAcceptableException();

            return this.jwtProvider.getTokenPair({
                email: isValid.email,
                name: isValid.name,
            });

        } catch (e) {
            console.log(e.message);
            throw new Error(e.message);
        }
    }

    async getAll(): Promise<Partial<UserEntity>[]> {
        try {
            return this.prismaService.user.findMany();
        } catch (e) {
            console.log(e.message);
            throw new Error(e.message);
        }
    }

    async deleteByEmail(email: string): Promise<void> {
        try {

            await this.prismaService.user.delete({
                where: {email},
            });

        } catch (e) {
            console.log(e.message);
            throw new Error(e.message);
        }
    }

    async getOneById(id: string | number): Promise<User> {
        try {

            return await this.prismaService.user.findFirstOrThrow({
                where: {
                    id: +id,
                },
                include: {roles: {select: {name: true}}},
            });

        } catch (e) {
            console.log(e.message);
            throw new Error(e.message);
        }
    }
}
