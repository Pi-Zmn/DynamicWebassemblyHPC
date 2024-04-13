import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { JobService } from './job.service';
import { JobDto } from './dto/job.dto';
import { Job } from './entities/job.entity';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  //TODO Validation

  @Post()
  create(@Body() jobDto: JobDto): Promise<Job> {
    return this.jobService.create(jobDto); 
  }

  @Get()
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Job> {
    return this.jobService.findOne(+id).then((job) => {
      if (!job) {
        throw new NotFoundException();
      }
      return job;
    });
  }

  @Get('active')
  getActiveJob(): Job {
    return this.jobService.activeJob;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() jobDto: JobDto): Promise<Job> {
    return this.jobService.update(+id, jobDto).then((job) => {
      if (!job) {
        throw new NotFoundException();
      }
      return job;
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.jobService.remove(+id);
    return `Deleted Job #${id}`; 
  }

  @Get('start/:id')
  startJob(@Param('id') id: number) {
    this.jobService.start(id);
  }

  @Get('stop/:id')
  stopJob(@Param('id') id: number) {
    this.jobService.stop(id);
  }

  @Get('reset/:id')
  resetJob(@Param('id') id: number) {
    this.jobService.reset(id);
  }
}
