import { Body, Controller, Get, Post } from '@nestjs/common';
import { createTaskDto } from './taskdto/create-task.dto';

import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTask(): Task[] {
        return this.tasksService.getAllTask();
    }

    @Post()
     createTasks(
       @Body() createTaskDto:createTaskDto):Task {
      return this.tasksService.createTask(createTaskDto);

    }
    @Get('/id')
    getTaskById(@Body('id')id):Task{
      return this.tasksService.getTaskById(id);
    }
}
