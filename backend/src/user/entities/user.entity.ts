import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

/**
 * User Entity - MongoDB Schema
 * timestamps: true sẽ tự động tạo createdAt và updatedAt
 */
@Schema({ 
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret.password; // Loại bỏ password khi convert sang JSON
      delete ret.__v;
      return ret;
    },
  },
})
export class User {
  @Prop({ 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    index: true, // Thêm index để tìm kiếm nhanh hơn
  })
  email: string;

  @Prop({ required: true })
  password: string;

  // timestamps: true sẽ tự động tạo field này
  createdAt: Date;
  
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
