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

    // @Get()
    // getTask(@Query()getaskquey:GetDtoTaskFilter): Task[] {
    //    if(Object.keys(getaskquey).length){
    //     return this.tasksService.getTaskWithFilter(getaskquey)
    //    }
    //    else{
    //      return this.tasksService.getAllTask()
    //    }
    // }

    // @Post()
    //  createTasks(
    //    @Body() createTaskDto:createTaskDto):Task {
    //   return this.tasksService.createTask(createTaskDto);

    // }
    @Get('/:id')
     getTaskById(@Param('id') id:string):Promise<Task>{
      return this.tasksService.findOnById(id);
    }

    // @Delete('/:id')
    // deletAllTask(@Param('id')id:string):void{
    //   return this.tasksService.deleteAllTask(id)
    // }

    // @Patch('/:id/status')
    // updateTaskState(
    //  @Param('id')id:string,
    //  @Body()updateStatus:UpdateStatusDto
    // ):Task{
    //   const{status}=updateStatus;
    //   return this.tasksService.updateTasks(id,status)
    // }
}
