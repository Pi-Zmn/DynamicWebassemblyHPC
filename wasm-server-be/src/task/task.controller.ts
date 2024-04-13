import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Task[] {
    return this.taskService.findAll();
  }

  // TODO Remove this, REST should not schedule a task
  @Get('next')
  getNextTask(): Task {
    return this.taskService.getNextTask();
  }
}
