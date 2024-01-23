import { Module } from '@nestjs/common';
import { TestRunModule } from './test-run/test-run.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module'; 
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TestRunModule, 
    ConfigModule.forRoot(), 
    CustomerModule, 
    UsersModule, 
    AuthModule,
    MongooseModule.forRoot(`mongodb+srv://root_mexs:root_mexs@mexs-argentina.hc5ttbc.mongodb.net/`)],
  controllers: [],
  providers: [],
})
export class AppModule { 

}
