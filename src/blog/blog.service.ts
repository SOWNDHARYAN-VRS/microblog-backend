import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogZodSchema } from './schemas/blog.schema';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>,
private readonly store:ClsService
) {}

  async create(blogData: Partial<Blog>): Promise<Blog> {
    const validationResult = BlogZodSchema.safeParse(blogData);
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error.errors);
    }

    const newBlog = new this.blogModel(blogData);
    newBlog.createdAt=new Date();
    return newBlog.save();
  }

  async findAll(page:number,limit:number,): Promise<Blog[]> {
    const skip = (page - 1) * limit;
    return this.blogModel.find()
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogModel.findById(id).exec();
  }

  async update(id: string, blogData: Partial<Blog>): Promise<Blog> {
    const validationResult = BlogZodSchema.safeParse(blogData);
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error.errors);
    }

    return this.blogModel.findByIdAndUpdate(id, blogData, { new: true }).exec();
  }

  async delete(id: string): Promise<Blog | null> {
    return this.blogModel.findByIdAndDelete(id).exec();
  }
}
