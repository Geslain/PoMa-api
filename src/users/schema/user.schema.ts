import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Compare two string by encrypting the first one given as parameter
 *
 * @param candidatePassword
 */
function comparePassword(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
}

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'Lullaby', description: "User's firstname" })
  @Prop()
  firstname!: string;

  @ApiProperty({ example: 'Norton', description: "User's lastname" })
  @Prop()
  lastname!: string;

  @ApiProperty({
    example: 'lullaby.norton@gmail.com',
    description: "User's email",
  })
  @Prop()
  email!: string;

  @ApiProperty({ example: '1234567890', description: "User's password" })
  @Prop()
  password!: string;

  comparePassword: typeof comparePassword;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('comparePassword', comparePassword);
