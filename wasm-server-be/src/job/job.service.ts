import { Injectable, Logger } from '@nestjs/common';
import { JobDto } from './dto/job.dto';
import { Job } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const defaultJob: Job = {
  id: 1,
  name: 'dummy job',
  wasm: 'wasm.file',
  //input: [1, 2, 3],
  //results: []
}

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  activeJob = defaultJob;

  //TODO Validation

  async create(jobDto: JobDto): Promise<Job> {
    const newJob: Job = new Job();
    newJob.name = jobDto.name;
    newJob.wasm = jobDto.wasm;
    return await this.jobRepository.save(newJob);
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
    jobToUpdate.wasm = jobDto.wasm;
    return await this.jobRepository.save(jobToUpdate);
  }

  async remove(id: number) {
    await this.jobRepository.delete(id);
  }

  start(id: number) {
    Logger.log(`started Job #${id}`)
  }

  stop(id: number) {
      Logger.log(`stopped Job #${id}`)
  }

  reset(id: number) {
      Logger.log(`reset Job #${id}`)
  }
}