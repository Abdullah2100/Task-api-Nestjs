import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { async } from 'rxjs';
import { getEnvPath } from './common/helper/env.helper';



const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [TasksModule,
    ConfigModule.forRoot({
      envFilePath:envFilePath
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl:true,
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('port'),
          username: configService.get('username'),
          password: configService.get('password'),
          database: configService.get('database'),
        };
      },
    })
//     .forRoot({
//   type:'postgres',
//   host:process.env.host,
//   port:Number(process.env.port),
//   username:process.env.username,
//   password:process.env.password,
//   database:process.env.database,
//   synchronize: true,
//   autoLoadEntities: true
// }),
    
    ,AuthModule
  ],
 

})
export class AppModule { 
  
}
