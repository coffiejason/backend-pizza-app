import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';


@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {

        return {
            "type": "mongodb",
            "url": this.configService.get<string>('DATABASE_URL'),
            "useNewUrlParser": true,
            "synchronize": true,
            "logging": true,
            "entities": [__dirname + '/../**/*.model{.ts,.js}']
        };
    }
}