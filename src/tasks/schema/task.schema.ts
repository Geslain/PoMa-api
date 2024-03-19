import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Task {
  @Prop()
  @ApiProperty({ example: 'todo', description: "Task's name" })
  name!: string;

  @Prop()
  @ApiProperty({
    example: 'Should do this or that',
    description: "Task's description",
  })
  description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
