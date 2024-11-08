import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClsModule } from 'nestjs-cls';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { constants } from './common/constants/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: ['.env.dev'],
    }),
    //env is not working when converted to docker image
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(constants.MONGODBURI),
      }),
      inject: [ConfigService],
    }),
    BlogModule,
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls, req) => {
          const token = req.headers[constants.AUTHORIZATION] || null;
          cls.set(constants.TOKEN, token); 
        },
      }
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
