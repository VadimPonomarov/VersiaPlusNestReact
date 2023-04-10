import {Injectable, NotAcceptableException} from '@nestjs/common';
import {PrismaService} from '../../../../core/prisma.service';
import {JwtEnum} from '../../../../common/constants';
import {JwtService} from '@nestjs/jwt';
import config from '../../../../config/configuration';
import {JwtDto, JwtPayloadDto} from '../../dto';
import {Cron, CronExpression} from '@nestjs/schedule';

@Injectable()
export class JwtProvider {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) {
    }

    getJwt(type: JwtEnum, payLoad: JwtPayloadDto): JwtDto {
        try {
            const token = this.jwtService.sign(payLoad, {
                secret: config().jwt.secret,
                expiresIn: config().jwt.signOptions[type].expiresIn,
            });
            this.registerToken({type, token})
                .then(result => {
            })
                .catch(e => {
                });
            return {type, token};
        } catch (e) {
            throw new Error(e);
        }
    }

    async getIsJwtRegistered(jwt: string): Promise<boolean> {
        try {
            const isExist = await this.prismaService.token.findUnique({where: {token: jwt}});
            //console.log(Boolean(isExist));
            return Boolean(isExist);
        } catch (e) {
        }
    }

    getIsJwtValid(jwt: JwtDto): JwtPayloadDto {
        try {
            const result = this.jwtService.verify(jwt.token, {
                secret: config().jwt.secret,
            });
            return result;
        } catch (e) {
        }
    }

    getTokenPair(payLoad: JwtPayloadDto): JwtDto[] {
        try {
            return [
                this.getJwt(JwtEnum.ACCESS, payLoad),
                this.getJwt(JwtEnum.REFRESH, payLoad),
            ];
        } catch (e) {
        }
    }

    async registerToken(jwt: JwtDto) {
        try {
            return await this.prismaService.token.create({
                data: {
                    token: jwt.token,
                    type: jwt.type,
                },
            });
        } catch (e) {
        }
    }

    async removeJwtFromRegister(jwt: JwtDto) {
        try {
            return await this.prismaService.token.delete({
                where: {token: jwt.token},
            });
        } catch (e) {
        }
    }

    /*
      * * * * * *
      | | | | | |
      | | | | | day of week
      | | | | months
      | | | day of month
      | | hours
      | minutes
      seconds (optional)
    * */
    @Cron('59 59 23 * * *')
    async cleanJwtRegister() {
        this.prismaService.token
            .findMany()
            .then((jwtList) =>
                jwtList.map(async (item) => {
                    return !((await this.getIsJwtValid({
                        type: JwtEnum[item.type],
                        token: item.token,
                    }))
                        ? await this.removeJwtFromRegister({
                            type: JwtEnum[item.type],
                            token: item.token,
                        })
                        : await (() => false));
                }),
            )
            .then(() => console.log('!!! Crone cleanJwtRegister is done'))
            .catch(e => console.log(e));
    }
}
