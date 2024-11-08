import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { z } from 'zod';

@Schema()
export class Blog extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  author: string;

  @Prop()
  createdAt:Date;
}

const BlogZodSchema = z.object({
  title: z.string().min(5, "Title is required"),
  content: z.string().min(5, "Content is required"), 
  author: z.string().max(10,"Max length is 10")
});

export { BlogZodSchema };

export const BlogSchema = SchemaFactory.createForClass(Blog);
