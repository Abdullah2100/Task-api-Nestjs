import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Repository } from 'typeorm';
import { Task } from './task.entity';


@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private TaskRepository:Repository<Task> 
    ){}

  async findOnById(id:string):Promise<Task>{
  const fond=await this.TaskRepository.findOne({where:{id:id}})
  if(!fond){
      throw new NotFoundException(`user with ${id} not found`)
  }
  return fond;
 }
}
