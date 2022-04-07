import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from './tasks/task.entity';



@Module({
  imports: [TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'satao.db.elephantsql.com',
      port: 5432,
      username: 'pjagnftu',
      password: '3Ferrm81wsK0JW2GSrR4QQ6GrOsCvKlz',
      database: 'pjagnftu',
      entities:[Task], 
      synchronize: true,
      keepConnectionAlive:false

    })
  ],
 

})
export class AppModule { 
  
}
