import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Logger,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

/**
 * User Controller
 * Xử lý các request liên quan đến user (register, login)
 */
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor) // Tự động serialize response theo DTO
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  /**
   * Đăng ký user mới
   * POST /user/register
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log(`POST /user/register - Received registration request for: ${registerDto.email}`);
    return this.userService.register(registerDto);
  }

  /**
   * Đăng nhập user
   * POST /user/login
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`POST /user/login - Received login request for: ${loginDto.email}`);
    return this.userService.login(loginDto);
  }
}