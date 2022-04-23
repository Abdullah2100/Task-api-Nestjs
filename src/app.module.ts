import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { async } from 'rxjs';
import { getEnvPath } from './common/helper/env.helper';
import { PostgresDBConfigService } from './typeOrmOption';



// const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [TasksModule,
    
      ConfigModule.forRoot({
        isGlobal: true
      }),
      TypeOrmModule.forRootAsync({
        useClass: PostgresDBConfigService,
        inject: [PostgresDBConfigService]
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
