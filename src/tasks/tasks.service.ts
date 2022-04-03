import { Injectable, NotFoundException } from '@nestjs/common';
import {Task, TaskStatus} from '../tasks/tasks.model'
import {v4 as uuid}from 'uuid'
import { createTaskDto } from './taskdto/create-task.dto';
import { GetDtoTaskFilter } from './taskdto/get_task.to';
@Injectable()
export class TasksService {
    private tasks:Task[]=[];

    getAllTask(): Task[]{
        return this.tasks;
    }

    getTaskWithFilter(taskFilter:GetDtoTaskFilter):Task[]{
      const{search,status}=taskFilter;
     let taskss=this.getAllTask();
     if(status){
        taskss=taskss.filter((task)=>task.status===status);
     }
     if(search){
         taskss=taskss.filter((task)=>{
             if(task.job.includes(search)||task.name.includes(search)){
                 return true;
             }
             return false;
         })
     }
     return taskss;
    }

    createTask(createTaskDto:createTaskDto ):Task{
      const {name,job}=createTaskDto
        const task:Task={
            id:uuid(),
            name,
            job,
            status:TaskStatus.CLOSE
            
        }
    this.tasks.push(task);
    
    return task;
}

getTaskById(id:string):Task{
   const found= this.tasks.find((e)=>e.id===id);
   if(!found){
       throw new NotFoundException(`user name with ${id} not found`);
   }
   return found;
}

deleteAllTask(id:string):void{
     this.tasks=this.tasks.filter((task)=>task.id!=id);
}


updateTasks(id:string,status:TaskStatus){
    const taskss=this.getTaskById(id)
    taskss.status=status
    return taskss
}
}
