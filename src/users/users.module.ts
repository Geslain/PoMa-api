import { Module } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Project, ProjectSchema } from '../projects/schema/project.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: (projectModel: Model<Project>) => {
          const schema = UserSchema;
          schema.pre('save', function (next) {
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

          schema.pre('findOneAndDelete', async function (next) {
            const id = this.getQuery()._id._id;
            await projectModel.deleteMany({ owner: id }).exec();
            await projectModel
              .updateMany(
                { members: id },
                {
                  $pull: { members: id },
                },
              )
              .exec();
            next();
          });

          return schema;
        },
        imports: [
          MongooseModule.forFeature([
            { name: 'Project', schema: ProjectSchema },
          ]),
        ],
        inject: [getModelToken('Project')],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
