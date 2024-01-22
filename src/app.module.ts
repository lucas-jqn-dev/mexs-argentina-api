import { Module } from '@nestjs/common';
import { TestRunModule } from './test-run/test-run.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module'; 
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TestRunModule, ConfigModule.forRoot(), CustomerModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { 

}
