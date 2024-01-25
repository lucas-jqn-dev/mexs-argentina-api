import { Module } from '@nestjs/common';
import { SapParametersService } from './sap-parameters.service';
import { SapParametersController } from './sap-parameters.controller';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, JwtModule],
  controllers: [SapParametersController],
  providers: [SapParametersService],
})
export class SapParametersModule {}
