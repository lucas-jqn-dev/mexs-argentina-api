import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module'; 
import { TestRunModule } from './test-run/test-run.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ClientsModule, TestRunModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule { }
