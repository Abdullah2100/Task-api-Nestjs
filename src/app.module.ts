import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';


@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
    useFactory: async (configService:ConfigService) =>  {
      

        return {
          
          extra: {
            ssl:{ rejectUnauthorized: false } ,
          },
          type: 'postgres', 
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username:configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
      
      }
    },
inject:[ConfigService]
    }),
    AuthModule,
  ],
})
export class AppModule {}
