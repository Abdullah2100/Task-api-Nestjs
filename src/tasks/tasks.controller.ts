import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getMaxListeners } from 'process';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Task } from './task.entity';
import { createTaskDto } from './taskdto/create-task.dto';
import { GetDtoTaskFilter } from './taskdto/get_task.to';
import { UpdateStatusDto } from './taskdto/update_statuse.dto';


import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTask(@Query() getaskquey: GetDtoTaskFilter, @GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasks(getaskquey, user)
  }

  @Post()
  createTasks(
    @Body() createTaskDto: createTaskDto,
    @GetUser() user: User): Promise<Task> {
    return this.tasksService.ceateTask(createTaskDto, user);

  }
  @Get('/:id')
  getTaskById(@Param('id') id: string,
    @GetUser() user: User): Promise<Task> {
    return this.tasksService.findOnById(id, user);
  }

  @Delete('/:id')
  deletAllTask(@Param('id') id: string,
    @GetUser() user: User,): Promise<void> {
    return this.tasksService.deletTask(id, user)
  }

  @Patch('/:id/status')
  updateTaskState(
    @Param('id') id: string,
    @Body() updateStatus: UpdateStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    const { status } = updateStatus;
    return this.tasksService.updateStatus(id, status, user)
  }
}
