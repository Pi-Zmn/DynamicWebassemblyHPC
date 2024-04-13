import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { Job } from 'src/job/entities/job.entity';
import { JobService } from 'src/job/job.service';

const defaultTasks: Task[] = [
  {
    id: 1,
    jobId: 1,
    input: undefined,
    result: undefined,
    scheduled: new Date(),
    finished: true
  },
  {
    id: 2,
    jobId: 1,
    input: undefined,
    result: undefined,
    scheduled: new Date(),
    finished: false
  },
  {
    id: 3,
    jobId: 1,
    input: undefined,
    result: undefined,
    scheduled: undefined,
    finished: false
  }
]

@Injectable()
export class TaskService {
  constructor(private readonly jobService: JobService) {}

  currentTasks: Task[] = defaultTasks;

  findAll() {
    // TODO Add current Job ?
    return this.currentTasks;
  }

  getNextTask(): Task {
    // TODO Smart Scheduling (Reschedule Task from Struggler-Device)
    const nextTask: Task = this.currentTasks.find((t) => !t.scheduled && t.finished === false)
    return nextTask;
  }

  generateTasks() {
    // TODO generate Tasks for active Job
    const activeJob: Job = this.jobService.activeJob;
    this.currentTasks = defaultTasks;
  }
}
