import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../api/user.api";
import { StarryBackground } from "../components/StarryBackground";

// Zod schema for registration validation
const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Vui lòng nhập email")
      .email("Email không hợp lệ"),
    password: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .regex(/^(?=.*[0-9])/, {
        message: "Mật khẩu phải có ít nhất 1 số",
      }),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: userApi.register,
    onSuccess: () => {
      alert("✅ Đăng ký thành công! Vui lòng đăng nhập.");
      navigate('/login');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message || "Có lỗi xảy ra";
      alert(`❌ Đăng ký thất bại: ${message}`);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      <StarryBackground />
      
      {/* Main Card Container */}
      <div className="relative z-10 flex w-full max-w-5xl bg-[#1a1a2e]/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden min-h-[600px] animate-in fade-in zoom-in-95 duration-700">
        
        {/* Left Side - Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          
          <div className="w-full max-w-md mx-auto flex flex-col gap-6">
            
            {/* Nút Back */}
            <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors w-fit">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Về trang chủ
            </Link>
            
            {/* 1. Header Section */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-white">Tạo tài khoản</h2>
                <p className="text-gray-400 mt-2">Đăng ký để bắt đầu trải nghiệm</p>
              </div>
            </div>

            {/* 2. Form Section - Dùng gap-5 để chia các ô input */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              
              {/* Email Group - Dùng gap-2 để chia Label và Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-300 ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    {...register("email")}
                    className="w-full bg-[#2a2a40] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-400 ml-1">{errors.email.message}</p>}
              </div>

              {/* Password Group - Dùng gap-2 */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-300 ml-1">Mật khẩu</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full bg-[#2a2a40] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                  />
                </div>
                <p className="text-xs text-gray-500 ml-1">Ít nhất 6 ký tự, bao gồm 1 số</p>
                {errors.password && <p className="text-xs text-red-400 ml-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password Group - Dùng gap-2 */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-300 ml-1">Xác nhận mật khẩu</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="w-full bg-[#2a2a40] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                  />
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-400 ml-1">{errors.confirmPassword.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col gap-4 mt-2">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-lg hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-purple-500/30 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Đang xử lý...
                    </span>
                  ) : (
                    "Tạo tài khoản"
                  )}
                </button>
              </div>
            </form>

            {/* 3. Footer Section */}
            <div className="flex flex-col gap-4 text-center">
              <p className="text-xs text-gray-500 leading-relaxed">
                Bằng việc đăng ký, bạn đồng ý với{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Điều khoản dịch vụ</a>{" "}
                và{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Chính sách bảo mật</a>
              </p>
              <p className="text-gray-400">
                Đã có tài khoản?{" "}
                <Link to="/login" className="font-bold text-purple-400 hover:text-purple-300">Đăng nhập</Link>
              </p>
            </div>

          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <img
            src="https://i.pinimg.com/736x/76/eb/c7/76ebc7c1a62cf4f81ba450a10d266388.jpg"
            alt="Register"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1a1a2e]/90" />
          <div className="absolute bottom-10 left-10 right-10">
            <h2 className="text-3xl font-bold text-white mb-3">Tham gia cùng chúng tôi!</h2>
            <p className="text-gray-200">Tạo tài khoản và khám phá những điều tuyệt vời</p>
          </div>
        </div>
      </div>
    </div>
  );
};