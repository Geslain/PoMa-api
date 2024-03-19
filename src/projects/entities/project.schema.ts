import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schema/user.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Project {
  @Prop()
  name!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner!: User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  members: User[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
