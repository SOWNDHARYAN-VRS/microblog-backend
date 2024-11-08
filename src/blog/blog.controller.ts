import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query, ForbiddenException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './schemas/blog.schema';
import { AuthGuard } from '../common/guards/auth.guard';

@Controller('/api/blogs')
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() blogData: Partial<Blog>): Promise<Blog> {
    return this.blogService.create(blogData);
  }
  @Get()
  findAll(@Query('page') page: number, @Query('size') size: number): Promise<Blog[]> {
    return this.blogService.findAll(page, size);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() blogData: Partial<Blog>): Promise<Blog> {
    return this.blogService.update(id, blogData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Blog> {
    return this.blogService.delete(id);
  }

}
