import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  /**
   * Đăng ký user mới
   * @param registerDto - Dữ liệu đăng ký (email, password)
   * @returns Thông tin user đã tạo
   */
  async register(registerDto: RegisterDto): Promise<{
    success: boolean;
    message: string;
    data: UserResponseDto;
  }> {
    const { email, password } = registerDto;
    this.logger.log(`Attempting to register user with email: ${email}`);

    try {
      // Check if email exists
      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        this.logger.warn(`Registration failed: Email ${email} already exists`);
        throw new ConflictException('Email đã được sử dụng');
      }

      // Hash password với cost factor 10
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new this.userModel({
        email: email.toLowerCase().trim(),
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      this.logger.log(`User registered successfully: ${email}`);

      // Return response matching frontend RegisterResponse type
      return {
        success: true,
        message: 'Đăng ký thành công',
        data: this.mapToResponseDto(savedUser),
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(`Registration error for ${email}:`, error);
      throw new InternalServerErrorException('Lỗi server khi đăng ký');
    }
  }

  /**
   * Đăng nhập user
   * @param loginDto - Dữ liệu đăng nhập (email, password)
   * @returns Thông tin user nếu đăng nhập thành công
   */
  async login(loginDto: LoginDto): Promise<{ message: string; user: UserResponseDto }> {
    const { email, password } = loginDto;
    this.logger.log(`Login attempt for email: ${email}`);

    try {
      // Find user by email
      const user = await this.userModel.findOne({ email: email.toLowerCase() }).exec();
      if (!user) {
        this.logger.warn(`Login failed: Email ${email} not found`);
        throw new UnauthorizedException('Sai email hoặc mật khẩu');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Login failed: Invalid password for ${email}`);
        throw new UnauthorizedException('Sai email hoặc mật khẩu');
      }

      this.logger.log(`User logged in successfully: ${email}`);

      // Return response
      return {
        message: 'Đăng nhập thành công',
        user: this.mapToResponseDto(user),
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      this.logger.error(`Login error for ${email}:`, error);
      throw new InternalServerErrorException('Lỗi server khi đăng nhập');
    }
  }

  // =========== Helper Methods ===========

  /**
   * Map UserDocument sang UserResponseDto
   * Loại bỏ password và các field nhạy cảm
   */
  private mapToResponseDto(user: UserDocument, message?: string): UserResponseDto {
    return new UserResponseDto({
      _id: user._id.toString(),
      email: user.email,
      createdAt: user.createdAt,
      ...(message && { message }),
    });
  }
}