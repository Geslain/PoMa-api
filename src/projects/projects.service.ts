import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schema/project.schema';
import { AddMemberDto } from './dto/add-member.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectModel.create(createProjectDto);
  }

  findAll() {
    return this.projectModel.find().populate('owner').exec();
  }

  async findOne(id: string) {
    return await this.projectModel.findById(id).populate('owner').exec();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel
      .findOneAndUpdate({ _id: id }, updateProjectDto, {
        returnOriginal: false,
      })
      .populate('owner')
      .exec();
  }

  async remove(id: string) {
    return await this.projectModel.findByIdAndDelete({ _id: id }).exec();
  }

  async addMember(id: string, addMemberDto: AddMemberDto) {
    return await this.projectModel
      .findOneAndUpdate(
        { _id: id },
        { $addToSet: { members: addMemberDto } },
        { returnOriginal: false },
      )
      .populate('members')
      .exec();
  }
}
