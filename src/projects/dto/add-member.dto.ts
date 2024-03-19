import { IsNotEmpty } from 'class-validator';

export class AddMemberDto {
  @IsNotEmpty()
  _id!: string;
}
