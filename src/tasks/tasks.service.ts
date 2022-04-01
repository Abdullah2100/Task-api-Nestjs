import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from '../tasks/tasks.model'
import {v4 as uuid}from 'uuid'
import { createTaskDto } from './taskdto/create-task.dto';
@Injectable()
export class TasksService {
    private tasks:Task[]=[];

    getAllTask(): Task[]{
        return this.tasks;
    }

    createTask(createTaskDto:createTaskDto ):Task{
      const {name,job}=createTaskDto
        const task:Task={
            id:uuid(),
            name,
            job,
            status:TaskStatus.OPEN
            
        }
    this.tasks.push(task);
    
    return task;
}

getTaskById(id:string):Task{
    return this.tasks.find((e)=>e.id===id);
}
}
