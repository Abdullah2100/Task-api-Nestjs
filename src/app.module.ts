import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module';
import { join } from 'path';




@Module({
  imports: [TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'satao.db.elephantsql.com',
      port: 5432,
      username: 'pjagnftu',
      password: '3Ferrm81wsK0JW2GSrR4QQ6GrOsCvKlz',
      database: 'pjagnftu',
      synchronize: true,
      autoLoadEntities: true
      // entities: [join(__dirname , '**','*.entity.{js,ts}')],
      
      
      
    }),
    AuthModule
  ],
 

})
export class AppModule { 
  
}
