import {DocumentBuilder} from '@nestjs/swagger';
import {join} from 'path';
import {cwd} from 'process';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as process from 'process';
import {JwtEnum} from '../common/constants';

export const swagger = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth({
        type: "http",
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }, 'access-token')
    .build();

export const CORSprops = {
    /*origin: '*',*/
    //origin: '*',
    allowedHeaders: '*',
}
export default () => ({
    port: parseInt(process.env.SERVER_PORT, 10) || 3001,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    },
    swagger,
    bcrypt: {salt: 5},
    jwt: {
        secret: process.env.JWT_SECRET,
        signOptions: {
            [JwtEnum.ACCESS]: {expiresIn: '15m'},
            [JwtEnum.REFRESH]: {expiresIn: '30d'},
            [JwtEnum.ACTIVATE]: {expiresIn: '3d'},
        },
    },
    hbs: {
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: join(cwd(), 'views/layouts'),
        partialsDir: join(cwd(), 'views/partials'),
    },
    scrapeProvider: {
        configOptions: {
            headless: true,
            isGlobal: true,
            cache: false
        },
        goTo: process.env.SCRAPE_PROVIDER_GOTO,
        logName: process.env.SCRAPE_PROVIDER_LOG_NAME,
        pass: process.env.SCRAPE_PROVIDER_PASS,
        viewport: {width: 1920, height: 3000},
        cache: false
    },
    mailerOptions: {
        transport: process.env.MAILER_TRANSPORT,
        secure: false,
        defaults: {
            from: process.env.MAILER_FROM_DEFAULT,
            to: 'pvs.versia@gmail.com',
            subject: 'Versia Plus Gmail service ✔', // Subject line
            template: 'index',
            context: {
                message: 'Hello world !!!',
            },
        },
        template: {
            dir: join(cwd(), '/views'),
            adapter: new HandlebarsAdapter(undefined, {
                inlineCssEnabled: true,
            }),
            options: {
                strict: true,
            },
        },
    },
});
