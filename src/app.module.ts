import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TestRunModule } from './test-run/test-run.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth/auth.middleware';

@Module({
  imports: [TestRunModule, ConfigModule.forRoot(), CustomerModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

}
