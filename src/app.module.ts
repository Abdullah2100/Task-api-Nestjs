import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { configValidationSchema } from './config.schema';





@Module({
  imports: [TasksModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
//     .forRoot
// TypeOrmModule.forRoot({
//     type:'postgres',
//   host:'ec2-52-54-212-232.compute-1.amazonaws.com',
//   port:5432,
//   username:'pzhtlslivjhqsu',
//   password:'fc69850cd234c268fdb8e4e08d2dbdef0abffbc7407ad8e947862597cc7c0ef5z',
//   database:'d36rg1oqg70k4c',
//   // migrations:["dist/migration/**/*{.ts,.js}"],
//   // entities:["dist/migrations/**/*{.ts.js}"],
  
//   // url:process.env.db_url,
 
//   synchronize: false,
//   autoLoadEntities: true,
//  extra:{
//    ssl:{
//                 rejectUnauthorized: false
//               }
//  }
// }),
    
    AuthModule
  ],
 

})
export class AppModule { 
  
}
