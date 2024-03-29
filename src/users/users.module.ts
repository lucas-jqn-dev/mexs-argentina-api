import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Users', schema: UserSchema }
  ])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }

