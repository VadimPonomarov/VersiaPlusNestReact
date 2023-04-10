import {Controller, Get, Res} from '@nestjs/common';
import {Response} from 'express';
import {ApiExcludeController, ApiTags} from '@nestjs/swagger';

@ApiTags('Home')
@ApiExcludeController()
@Controller('')
export class AppController {
    @Get('')
    async getApi(@Res() res: Response) {
        res.send('Hello World !!!')
    }
}
