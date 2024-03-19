import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsNotEmpty()
  @ApiProperty()
  name!: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '65f7e6eacad33160461db17b',
    description: 'User id for the project owning',
  })
  owner!: string;
}
