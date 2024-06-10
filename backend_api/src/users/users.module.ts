import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import Users, { userSchema } from './schemas/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Users.name, schema:userSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
