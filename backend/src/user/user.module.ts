import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './entities/user.entity';

/**
 * User Module
 * Quản lý các tính năng liên quan đến user
 */
@Module({
  imports: [
    // Đăng ký User Schema với Mongoose
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export để các module khác có thể sử dụng
})
export class UserModule {}