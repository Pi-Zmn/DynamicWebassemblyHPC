import { Injectable, Logger } from '@nestjs/common';
import { JobDto } from './dto/job.dto';
import { Job } from './entities/job.entity';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as path from 'path';
import { createWriteStream } from 'fs';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private eventEmitter: EventEmitter2
  ) {}

  activeJob: Job | undefined = undefined;

  //TODO Validation

  async create(jobDto: JobDto): Promise<Job> {
    const newJob: Job = new Job();
    newJob.name = jobDto.name;
    newJob.status = jobDto.status;
    newJob.progress = jobDto.progress;
    newJob.totalTasks = jobDto.totalTasks;
    newJob.taskBatchSize = jobDto.taskBatchSize;
    newJob.taskTimeOut = jobDto.taskTimeOut;
    newJob.language = jobDto.language;
    
    const savedJob = await this.jobRepository.save(newJob);
    this.publishJobUpdate()
    return savedJob
  }

  async findAll(): Promise<Job[]> {
    return await this.jobRepository.find();
  }

  async findOne(id: number): Promise<Job> {
    return await this.jobRepository.findOneBy({ id });
  }

  async update(id: number, jobDto: JobDto): Promise<Job> { 
    const jobToUpdate: Job = await this.jobRepository.findOneBy({ id });
    if (!jobToUpdate) {
      return null;
    }
    jobToUpdate.name = jobDto.name;
    jobToUpdate.status = jobDto.status;
    jobToUpdate.progress = jobDto.progress;
    jobToUpdate.totalTasks = jobDto.totalTasks;
    jobToUpdate.taskBatchSize = jobDto.taskBatchSize;
    jobToUpdate.taskTimeOut = jobDto.taskTimeOut;
    jobToUpdate.language = jobDto.language;

    const updatedJob = await this.jobRepository.save(jobToUpdate)
    this.publishJobUpdate()
    return updatedJob;
  }

  async remove(id: number) {
    await this.jobRepository.delete(id);
    this.publishJobUpdate()
  }

  async generateTasks(job: Job): Promise<Task[]> { 
    /* NPM Package to read a file Line by Line */
    const lineByLine = require('n-readlines');
    const liner = new lineByLine(path.join(__dirname, '../../wasm', job.name, 'input.txt'));
    
    let line;
    let lineNumber = 0;
    const newTasks: Task[] = []
    
    while ((lineNumber < job.progress + job.taskBatchSize) && (line = liner.next())) {
      if (lineNumber >= job.progress) {
        newTasks.push({
          id: lineNumber,
          jobId: job.id,
          timeOut: job.taskTimeOut,
          scheduledAt: undefined,
          done: false,
          runTime: undefined,
          input: line.toString('utf-8').split(" "),
          result: undefined
        })
      }
      lineNumber++;
    }
    return newTasks;
  }

  async getNumOfTotalTasks(jobName: string): Promise<number> {
    /* NPM Package to read a file Line by Line */
    const lineByLine = require('n-readlines');
    const liner = new lineByLine(path.join(__dirname, '../../wasm', jobName, 'input.txt'));
    
    let totalTasks = 0;
    while (liner.next()) {
      totalTasks++;
    }
    return totalTasks;
  }

  /* 
   * Returns next Scheduled Task
   * OR
   * calls new Logic if all Tasks are Done
  */
  getNextTasks(): Task | null {
    /* only get task from a active and running Job */
    if(this.activeJob && this.activeJob.status == 2) {
      // TODO: Improve Scheduling Algorithm (Currently FIFO?)
      const now = new Date()
      const nextTaskIndex = this.activeJob.tasks.findIndex((t) => {
        if(!t.done) {
          if(t.scheduledAt && 
            /* calculate time in seconds */
            Math.floor((now.getTime() - t.scheduledAt.getTime()) / 1000)
            < this.activeJob.taskTimeOut) {
              return false
            }
          /* Task is not done AND not scheduled OR scheduled longer than timeOut */
          return true;
        }
      })

      if (nextTaskIndex == -1) {
        return null
      }

      this.activeJob.tasks[nextTaskIndex].scheduledAt = now;
      return this.activeJob.tasks[nextTaskIndex]
    }
  }

  recieveResult(task: Task) {
    if(this.activeJob && this.activeJob.id == task.jobId) {
      // TODO combine bouth find loops to only one for performance?
      const updateTaskIndex = this.activeJob.tasks.findIndex((t) => !t.done && t.id == task.id)
      if (updateTaskIndex > 0) {
        /* Replace scheduled Task with Result if not already done */
        this.activeJob.tasks[updateTaskIndex] = task
      }

      
      /* Check if all tasks are done */
      const pendingTaskIndex = this.activeJob.tasks.findIndex((t) => !t.done)
      if (pendingTaskIndex == -1) {
        /* All Tasks Done | Stop Job and get new Tasks */
        if (this.activeJob.status == 2) {
          Logger.log('Task Batch Done')
          this.stop()
          this.allTasksDone()
          return
        }
      }
      this.publishActiveJobUpdate() 
    }
  }

  /* Saves all Results from Task in .txt and Updates Job Progress */ 
  async saveResults() {
    if (this.activeJob && this.activeJob.status != 2) {
      const resultStream = createWriteStream(
        path.join(__dirname, '../../wasm', this.activeJob.name, 'result.txt'),
        {flags: 'a'}
      )
      //let totalTime = 0
      for (let task of this.activeJob.tasks) {
        if (task.done) {
          resultStream.write(JSON.stringify(task.result) + '\n')
          this.activeJob.progress = this.activeJob.progress + 1
          //totalTime = totalTime + t.runTime
        } else {
          /* Discard all results after one missing Result in order */
          resultStream.end()
          break
        }
      }
      resultStream.end()

      //TODO Notify Dashboard to load new results.txt
    }
  } 

  async allTasksDone() {
    if (this.activeJob && this.activeJob.status != 2 && this.activeJob.tasks.length > 0) {
      await this.saveResults()
      if (this.activeJob.progress > this.activeJob.totalTasks) {
        /* Prepare Job with new Tasks */
        this.update(this.activeJob.id, new JobDto(this.activeJob))
        this.activeJob.tasks = await this.generateTasks(this.activeJob);
        this.start()
      } else {
        /* Job is DONE */
        this.activeJob.status = 4
        this.update(this.activeJob.id, new JobDto(this.activeJob))
        this.activeJob = undefined
        this.publishActiveJobUpdate() 
      }
    }
  }

  async activate(job: Job) {
    Logger.log(`activated Job #${job.id}`)
    if(!this.activeJob ||
       this.activeJob && this.activeJob.id !== job.id && 
       this.activeJob.status !== 2) {
        /* Stop and Save Previous Active Job */
        if (this.activeJob) {
          this.stop()
          await this.saveResults()
          await this.update(this.activeJob.id, new JobDto(this.activeJob))
        }
        this.activeJob = job;
        this.activeJob.status = 1; 
        this.activeJob.progress = job.progress;
        this.activeJob.tasks = await this.generateTasks(job);
        if (job.totalTasks == 0) {
          this.activeJob.totalTasks = await this.getNumOfTotalTasks(job.name)
          /* Save totalTasks to DB */
          this.update(this.activeJob.id, new JobDto(this.activeJob))
        }
      this.publishActiveJobUpdate()
    }   
  }

  start(): boolean {
    if (this.activeJob) {
      Logger.log(`started Job: ${this.activeJob.name}`)
      this.activeJob.status = 2
      // TODO Notify Workers
      this.publishActiveJobUpdate()
      return true
    }
    return false 
  }

  stop(): boolean {
    if (this.activeJob) {
      Logger.log(`stopped Job: ${this.activeJob.name}`)
      this.activeJob.status = 3
      this.publishActiveJobUpdate() 
      return true 
    }
    return false 
  }

  reset(): boolean {
    if (this.activeJob) {
      Logger.log(`reset Job: ${this.activeJob.name}`)
      this.activeJob.status = 3
      this.activeJob.progress = 0
      this.activeJob.tasks = []

      /* Delete result.txt */
      const resultStream = createWriteStream(
        path.join(__dirname, '../../wasm', this.activeJob.name, 'result.txt'),
        {flags: 'w'}
      )
      resultStream.write('')
      resultStream.end()

      this.update(this.activeJob.id, new JobDto(this.activeJob))
      this.publishActiveJobUpdate() 
      return true
    }
    return false 
  }

  async publishJobUpdate() {
    /* Publish 'job-update' Event to notify Dashboard Socket */
    this.eventEmitter.emit('job-update', await this.jobRepository.find())
  }

  publishActiveJobUpdate() {
    this.eventEmitter.emit('activeJob-update', this.activeJob)
  }
}