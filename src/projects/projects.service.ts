import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schema/project.schema';
import { AddMemberDto } from './dto/add-member.dto';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../tasks/dto/update-task.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    if ('user' in this.request) {
      const requestUser = this.request.user as Record<string, string>;

      return await this.projectModel.create({
        ...createProjectDto,
        owner: requestUser.sub,
      });
    }
  }

  findAll() {
    return this.projectModel.find().populate('owner').populate('tasks').exec();
  }

  async findOne(id: string) {
    return await this.projectModel
      .findById(id)
      .populate('owner')
      .populate('tasks')
      .populate('members')
      .exec();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel
      .findOneAndUpdate({ _id: id }, updateProjectDto, {
        returnOriginal: false,
      })
      .populate('owner')
      .populate('members')
      .populate('tasks')
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
      .populate('owner')
      .populate('members')
      .populate('tasks')
      .exec();
  }

  async removeMember(id: string, memberId: string) {
    return await this.projectModel
      .findOneAndUpdate(
        { _id: id, members: memberId },
        {
          $pull: { members: memberId },
        },
        { returnOriginal: false },
      )
      .populate('owner')
      .populate('members')
      .populate('tasks')
      .exec();
  }

  async createTask(id: string, createTaskDto: CreateTaskDto) {
    return await this.projectModel
      .findOneAndUpdate(
        { _id: id },
        { $addToSet: { tasks: createTaskDto } },
        { returnOriginal: false },
      )
      .populate('owner')
      .populate('members')
      .populate('tasks')
      .exec();
  }

  async updateTask(id: string, taskId: string, updateTaskDto: UpdateTaskDto) {
    const set = {};

    // Partial update logic
    for (const field in updateTaskDto) {
      set['tasks.$.' + field] = updateTaskDto[field];
    }

    return await this.projectModel
      .findOneAndUpdate(
        { _id: id, 'tasks._id': taskId },
        {
          $set: set,
        },
        { returnOriginal: false },
      )
      .populate('owner')
      .populate('members')
      .populate('tasks')
      .exec();
  }

  async removeTask(id: string, taskId: string) {
    return await this.projectModel
      .findOneAndUpdate(
        { _id: id, 'tasks._id': taskId },
        {
          $pull: { tasks: { _id: taskId } },
        },
        { returnOriginal: false },
      )
      .populate('owner')
      .populate('members')
      .populate('tasks')
      .exec();
  }
}
