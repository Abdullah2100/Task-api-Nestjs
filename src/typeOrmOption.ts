import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class PostgresDBConfigService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            
            extra: { ssl: true, rejectUnauthorized: false },
            type: 'postgres',
            autoLoadEntities: true,
            synchronize: true,
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get('port'),
            username:this.configService.get<string>('username'),
            password: this.configService.get<string>('password'),
            database: this.configService.get<string>('database'),
            url:this.configService.get<string>('db_url')
    };
  }
}