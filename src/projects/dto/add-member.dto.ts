import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMemberDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '65f7e6eacad33160461db17b',
    description: 'User id to add to project member',
  })
  _id!: string;
}
