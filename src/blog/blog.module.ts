import { Global, Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { ClsModule, ClsService } from 'nestjs-cls';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    ClsModule.forFeature()
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}