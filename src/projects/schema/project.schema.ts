import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schema/user.schema';
import mongoose, { Document } from 'mongoose';
import { Task, TaskSchema } from '../../tasks/schema/task.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop()
  @ApiProperty({ example: 'Important stuff', description: "Project's name" })
  name!: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  @ApiProperty({ example: User, description: "Project's owner" })
  owner!: User;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    autopopulate: true,
  })
  @ApiProperty({
    isArray: true,
    example: [User],
    description: "Project's members",
  })
  members: User[];

  @Prop({ type: [TaskSchema] })
  @ApiProperty({
    isArray: true,
    example: [Task],
    description: "Project's tasks",
  })
  tasks: Task[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
