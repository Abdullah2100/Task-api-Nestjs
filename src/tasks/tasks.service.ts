import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { TaskStatu } from './task-Stateus.enum';
import { Task } from './task.entity';
import { createTaskDto } from './taskdto/create-task.dto';
import { GetDtoTaskFilter } from './taskdto/get_task.to';
import { UpdateStatusDto } from './taskdto/update_statuse.dto';


@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private TaskRepository:Repository<Task> 
    ){}
 


async getTasks(taskfilter:GetDtoTaskFilter,user:User):Promise<Task[]>{
    const{status,search}=taskfilter
   const queryTask=this.TaskRepository.createQueryBuilder('task');
   queryTask.where({ user });
   if(status){
       queryTask.andWhere('task.status = :status',{status});
   }
   if(search){
       queryTask.andWhere(
           'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.deascription) LIKE  LOWER(:search)',{search: `%${search}%`}
       )
   }
   const task=await queryTask.getMany()
   return task;  
}
  async findOnById(id:string,user:User):Promise<Task>{
  const fond=await this.TaskRepository.findOne({where:{id,user}})
  if(!fond){
      throw new NotFoundException(`user with ${id} not found`)
  }
  return fond;
 }

 async ceateTask(createTask:createTaskDto,user:User):Promise<Task> {
const{ name , job}= createTask;
const tasks=this.TaskRepository.create({
    name,
    job,
    status:TaskStatu.UNDERTHEPROGERESS,
    user
})
return await this.TaskRepository.save(tasks);
}

async deletTask(id:string,user:User): Promise<void>{
    const reuslt=await this.TaskRepository.delete({id,user});
    if(reuslt.affected === 0){
        throw new NotFoundException(`the user with ${id} not found`);
    }
 
}
async updateStatus(id:string,status:TaskStatu,user:User):Promise<Task>{
  const task=await this.findOnById(id,user)
  task.status=status;
 return await this.TaskRepository.save(task)
 
}
}
