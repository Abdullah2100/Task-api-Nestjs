import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { getMaxListeners } from 'process';
import { Task } from './task.entity';
import { createTaskDto } from './taskdto/create-task.dto';
import { GetDtoTaskFilter } from './taskdto/get_task.to';
import { UpdateStatusDto } from './taskdto/update_statuse.dto';


import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTask(@Query()getaskquey:GetDtoTaskFilter):Promise< Task[]> {
      return this.tasksService.getTasks(getaskquey)
    }

    @Post()
     createTasks(
       @Body() createTaskDto:createTaskDto):Promise<Task>{
      return this.tasksService.ceateTask(createTaskDto);

    }
    @Get('/:id')
     getTaskById(@Param('id') id:string):Promise<Task>{
      return this.tasksService.findOnById(id);
    }

    @Delete('/:id')
    deletAllTask(@Param('id')id:string):Promise<void>{
      return this.tasksService.deletTask(id)
    }

    @Patch('/:id/status')
    updateTaskState(
     @Param('id')id:string,
     @Body()updateStatus:UpdateStatusDto
    ):Promise<Task>{
      const{status}=updateStatus;
      return this.tasksService.updateStatus(id,status)
    }
}
