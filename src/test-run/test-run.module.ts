import { Module } from '@nestjs/common';
import { TestRunController } from './test-run.controller';
import { TestRunService } from './test-run.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, JwtModule],
  controllers: [TestRunController],
  providers: [TestRunService]
})
export class TestRunModule {}
