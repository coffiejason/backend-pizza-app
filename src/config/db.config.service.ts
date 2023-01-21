import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            "type": "mongodb",
            "url": "",
            "useNewUrlParser": true,
            "synchronize": true,
            "logging": true,
            "entities": [__dirname + '/../**/*.model{.ts,.js}']
        };
    }

}


