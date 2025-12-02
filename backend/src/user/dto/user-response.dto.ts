import { Exclude, Expose } from 'class-transformer';

/**
 * Response DTO để serialize data trả về client
 * Tự động loại bỏ password và các field nhạy cảm
 */
export class UserResponseDto {
  @Expose()
  _id: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  // Password sẽ tự động bị loại bỏ khi serialize
  @Exclude()
  password?: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
