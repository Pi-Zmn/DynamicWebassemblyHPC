import { MessageBody } from '@nestjs/websockets';
import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, Res, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { JobService } from './job.service';
import { JobDto } from './dto/job.dto';
import { Job } from './entities/job.entity';
import { join } from 'path';
import { readFileSync } from 'fs';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  //TODO Validation

  @Post()
  create(@Body() jobDto: JobDto): Promise<Job> {
    return this.jobService.create(jobDto); 
  }

  @Get()
  findAll(): Promise<JobDto[] | void> {
    return this.jobService.findAll().then((jobs) => {
      return jobs.map((job) => new JobDto(job))
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<JobDto> {
    return this.jobService.findOne(+id).then((job) => {
      if (!job) {
        throw new NotFoundException();
      }
      return new JobDto(job);
    });
  }

  @Get('active')
  getActiveJob(): JobDto {
    if (this.jobService.activeJob) {
      return new JobDto(this.jobService.activeJob)
    }
    throw new NotFoundException();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() jobDto: JobDto): Promise<JobDto> {
    return this.jobService.update(+id, jobDto).then((job) => {
      if (!job) {
        throw new NotFoundException();
      }
      return new JobDto(job);
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.jobService.remove(+id);
    return `Deleted Job #${id}`; 
  }

  /* Returns Started Job DTO or throws exception */
  @Get('activate/:id')
  async activateJob(@Param('id') id: number) {
    /* TODO: Check for running job instead (global running boolean?)
    if(this.jobService.activeJob) {
      throw new ForbiddenException(`Can not Activate Job #${id} while 
        Job #${this.jobService.activeJob.id} is active`)
    }*/

    const jobToActivate = await this.jobService.findOne(+id)
    if (!jobToActivate) {
      throw new NotFoundException();
    }
    await this.jobService.activate(jobToActivate)
    return new JobDto(jobToActivate)
  }

  @Get('start')
  async startJob() {
    if(await this.jobService.start()) {
      return true
    }
    throw new ForbiddenException(`Can not Start Job`) 
  }

  @Get('stop')
  stopJob() {
    if(this.jobService.stop()) {
      return true
    }
    throw new ForbiddenException(`Can not Stop Job`)
  }

  @Get('reset')
  resetJob(@Param('id') id: number) {
    if(this.jobService.reset()) {
      return true
    }
    throw new ForbiddenException(`Can not Reset Job`)
  }
}
