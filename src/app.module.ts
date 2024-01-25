import { Module } from '@nestjs/common';
import { TestRunModule } from './test-run/test-run.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module'; 
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SapParametersModule } from './sap-parameters/sap-parameters.module';

@Module({
  imports: [TestRunModule, 
    ConfigModule.forRoot(), 
    CustomerModule, 
    UsersModule, 
    AuthModule,
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mexs-argentina.hc5ttbc.mongodb.net/`),
    SapParametersModule],
  controllers: [],
  providers: [],
})
export class AppModule { 

}
