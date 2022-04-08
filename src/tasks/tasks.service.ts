import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Repository } from 'typeorm';
import { TaskStatu } from './model/taskState';
import { Task } from './task.entity';
import { createTaskDto } from './taskdto/create-task.dto';
import { GetDtoTaskFilter } from './taskdto/get_task.to';
import { UpdateStatusDto } from './taskdto/update_statuse.dto';


@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private TaskRepository:Repository<Task> 
    ){}
 


async getTasks(taskfilter:GetDtoTaskFilter):Promise<Task[]>{
    const{status,search}=taskfilter
   const queryTask=this.TaskRepository.createQueryBuilder('task');
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
  async findOnById(id:string):Promise<Task>{
  const fond=await this.TaskRepository.findOne({where:{id:id}})
  if(!fond){
      throw new NotFoundException(`user with ${id} not found`)
  }
  return fond;
 }

 async ceateTask(createTask:createTaskDto):Promise<Task> {
const{ name , job}= createTask;
const task={
    name,
    job,
    status:TaskStatu.underTheProgress
}
return await this.TaskRepository.save(task);
}

async deletTask(id:string): Promise<void>{
    const reuslt=await this.TaskRepository.delete(id);
    if(reuslt.affected === 0){
        throw new NotFoundException(`the user with ${id} not found`);
    }
 
}
async updateStatus(id:string,status:TaskStatu):Promise<Task>{
  const task=await this.findOnById(id)
  task.status=status;
 return await this.TaskRepository.save(task)
 
}
}
