import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from './interview.entity';
import { Repository } from 'typeorm';
import { InterviewCreateDto } from './dto/interview.create.dto';
import { User } from '../user/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview) private readonly repo: Repository<Interview>,
  ) {}

  async findAll() {
    return await this.repo.find({ relations: ['interviewee'] });
  }

  async findOne() {
    return await this.repo.findOne();
  }

  async create(createDto: InterviewCreateDto, user: User) {
    const entity = { ...createDto, ...{ interviewee: user } };
    const interview = this.repo.create(entity);

    return await interview.save();
  }

  async getPast() {
    return this.repo.find({
      where: { state: 'passed' },
      relations: ['interviewee', 'interviewer'],
      order: { date: 'DESC' },
    });
  }
}
