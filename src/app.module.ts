import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { async } from 'rxjs';




@Module({
  imports: [TasksModule,
    ConfigModule.forRoot({
      envFilePath:[`${process.env.stage}.env `]
    }),
    TypeOrmModule.forRootAsync({
     
      imports:[ConfigModule]
,inject:[ConfigService],
useFactory:async (configService:ConfigService)=>{
  return{
    type:'postgres',
    host: configService.get('host'),
    port: configService.get(' port'),
    username: configService.get('username'),
    password: configService.get('password'),
    database: configService.get('database'),
    synchronize: true,
    autoLoadEntities: true
  }
}
    }),
    AuthModule
  ],
 

})
export class AppModule { 
  
}
