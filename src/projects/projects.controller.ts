import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../tasks/dto/update-task.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Project } from './schema/project.schema';

@ApiBearerAuth()
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({
    status: 200,
    description: 'Created user',
    type: Project,
  })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all projects' })
  @ApiResponse({
    status: 200,
    description: 'All projects',
    type: [Project],
  })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one project' })
  @ApiResponse({
    status: 200,
    description: 'Found project',
    type: Project,
  })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({
    status: 200,
    description: 'Updated project',
    type: Project,
  })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({
    status: 200,
    description: 'Deleted project',
    type: Project,
  })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }

  // Members
  @Post(':id/members')
  @ApiOperation({ summary: 'Add a member to project' })
  @ApiResponse({
    status: 200,
    description: 'Updated project',
    type: Project,
  })
  addMember(@Param('id') id: string, @Body() addMemberDto: AddMemberDto) {
    return this.projectsService.addMember(id, addMemberDto);
  }

  @Delete(':id/members/:memberId')
  @ApiOperation({ summary: 'Delete a member to project' })
  @ApiResponse({
    status: 200,
    description: 'Updated project',
    type: Project,
  })
  removeMember(@Param('id') id: string, @Param('memberId') memberId: string) {
    return this.projectsService.removeMember(id, memberId);
  }

  // Tasks

  @Post(':id/tasks')
  @ApiOperation({ summary: 'Add a task to project' })
  @ApiResponse({
    status: 200,
    description: 'Updated project',
    type: Project,
  })
  createTask(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
    return this.projectsService.createTask(id, createTaskDto);
  }

  @Patch(':id/tasks/:taskId')
  @ApiOperation({ summary: 'Update a task of project' })
  @ApiResponse({
    status: 200,
    description: 'Updated project',
    type: Project,
  })
  updateTask(
    @Param('id') id: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.projectsService.updateTask(id, taskId, updateTaskDto);
  }

  @Delete(':id/tasks/:taskId')
  @ApiOperation({ summary: 'Delete a task to project' })
  @ApiResponse({
    status: 200,
    description: 'Updated project',
    type: Project,
  })
  removeTask(@Param('id') id: string, @Param('taskId') taskId: string) {
    return this.projectsService.removeTask(id, taskId);
  }
}
