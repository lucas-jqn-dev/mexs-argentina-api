import { Module } from '@nestjs/common'; 
import { TestRunModule } from './test-run/test-run.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TestRunModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule { }
