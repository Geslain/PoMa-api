import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

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
  @Prop()
  firstname!: string;

  @Prop()
  lastname!: string;

  @Prop()
  email!: string;

  @Prop()
  password!: string;

  comparePassword: typeof comparePassword;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(this.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      this.password = hash;
      next();
    });
  });
});

UserSchema.method('comparePassword', comparePassword);
