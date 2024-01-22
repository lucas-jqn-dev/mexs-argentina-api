import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { HttpModule } from '@nestjs/axios'; 
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, JwtModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
