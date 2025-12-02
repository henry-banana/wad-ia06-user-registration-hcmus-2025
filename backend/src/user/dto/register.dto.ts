import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

/**
 * DTO cho đăng ký user mới
 * Sử dụng class-validator để validate dữ liệu
 */
export class RegisterDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[0-9])/, {
    message: 'Mật khẩu phải có ít nhất 1 số',
  })
  password: string;
}