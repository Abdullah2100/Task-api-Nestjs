import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { getMaxListeners } from 'process';
import { createTaskDto } from './taskdto/create-task.dto';
import { GetDtoTaskFilter } from './taskdto/get_task.to';

import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTask(@Query()getaskquey:GetDtoTaskFilter): Task[] {
       if(Object.keys(getaskquey).length){
        return this.tasksService.getTaskWithFilter(getaskquey)
       }
       else{
         return this.tasksService.getAllTask()
       }
    }

    @Post()
     createTasks(
       @Body() createTaskDto:createTaskDto):Task {
      return this.tasksService.createTask(createTaskDto);

    }
    @Get('/:id')
    getTaskById(@Param('id') id:string):Task{
      return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deletAllTask(@Param('id')id:string):void{
      return this.tasksService.deleteAllTask(id)
    }

    @Patch('/:id/status')
    updateTaskState(
     @Param('id')id:string,
     @Body('status')states:TaskStatus
    ):Task{
      return this.tasksService.updateTasks(id,states)
    }
}
