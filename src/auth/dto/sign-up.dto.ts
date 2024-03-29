import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsNotEmpty()
  @ApiProperty()
  email!: string;

  @IsNotEmpty()
  @ApiProperty()
  password!: string;

  @IsNotEmpty()
  @ApiProperty()
  firstname!: string;

  @IsNotEmpty()
  @ApiProperty()
  lastname!: string;
}
