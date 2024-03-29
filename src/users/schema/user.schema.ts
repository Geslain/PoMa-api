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

UserSchema.pre('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      this.password = hash;
      next();
    });
  });
});

UserSchema.method('comparePassword', comparePassword);
