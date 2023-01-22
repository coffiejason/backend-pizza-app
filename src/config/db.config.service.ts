// import { Injectable } from '@nestjs/common';
// import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv';

// dotenv.config();

// @Injectable()
// export class DbConfigService implements TypeOrmOptionsFactory {
//     createTypeOrmOptions(): TypeOrmModuleOptions {
//         return {
//             "type": "mongodb",
//             "url": "mongodb+srv://dbuser:5B3fSlfCB0yZW62P@rest.woruh.mongodb.net/?retryWrites=true&w=majority",
//             "useNewUrlParser": true,
//             "synchronize": true,
//             "logging": true,
//             "entities": [__dirname + '/../**/*.model{.ts,.js}']
//         };
//     }
// }




import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            "type": "mongodb",
            "url": "mongodb+srv://dbuser:5B3fSlfCB0yZW62P@rest.woruh.mongodb.net/?retryWrites=true&w=majority",
            "useNewUrlParser": true,
            "synchronize": true,
            "logging": true,
            "entities": [__dirname + '/../**/*.model{.ts,.js}']
        };
    }

}


