import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import {ConfigModule, ConfigService} from '@nestjs/config'




@Module({
  imports: [TasksModule,
    ConfigModule.forRoot({
      envFilePath: '.production.env',
      
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
       
        return {
          // ssl: isProduction,
          extra: {
            ssl:{
              rejectUnauthorized: true
            }
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('host'),
          port: configService.get('port'),
          username: configService.get('username'),
          password: configService.get('password'),
          database: configService.get('database'),
        };
      },
    }),
//     .forRoot
// TypeOrmModule.forRoot({

//   extra: { encrypt: false,
//   //           ssl:{
//   //             rejectUnauthorized: false
//   //           }
//           },
//   type:'postgres',
//   host:process.env.host,
//   port:Number(process.env.port),
//   username:process.env.username,
//   password:process.env.password,
//   database:process.env.database,
//   // url:process.env.db_url,
//   ssl:{
//     rejectUnauthorized:false
//   },
//   synchronize: true,
//   autoLoadEntities: true,
//    entities:[__dirname +'dist/**/*.entity{.ts..js}']
// }),
    
    AuthModule
  ],
 

})
export class AppModule { 
  
}
