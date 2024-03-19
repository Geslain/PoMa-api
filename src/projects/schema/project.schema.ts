import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schema/user.schema';
import mongoose, { Document } from 'mongoose';
import { Task, TaskSchema } from '../../tasks/schema/task.schema';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop()
  name!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner!: User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  members: User[];

  @Prop({ type: [TaskSchema] })
  tasks: Task[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
