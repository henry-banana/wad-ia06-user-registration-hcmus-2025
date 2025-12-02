import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../api/user.api";
import { StarryBackground } from "../components/StarryBackground";

// Zod schema
const loginSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu").min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: userApi.login,
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      alert(`❌ Lỗi: ${error.response?.data?.message || "Có lỗi xảy ra"}`);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      <StarryBackground />
      
      {/* Main Card Container */}
      <div className="relative z-10 flex w-full max-w-5xl bg-[#1a1a2e]/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden min-h-[600px] animate-in fade-in zoom-in-95 duration-700">
        
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <img
            src="https://i.pinimg.com/736x/5f/ed/2c/5fed2c49efa6cb5ddbbad48d1adca27f.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a2e]/90" />
          <div className="absolute bottom-10 left-10 right-10">
            <h2 className="text-3xl font-bold text-white mb-3">Chào mừng trở lại!</h2>
            <p className="text-gray-200">Đăng nhập để tiếp tục hành trình.</p>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative">
          
          {/* Nút Back - Absolute */}
          <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             Về trang chủ
          </Link>
          
          <div className="w-full max-w-md mx-auto mt-12 flex flex-col gap-6">
            
            {/* 1. Header Section */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div>
                <h2 className="text-3xl font-bold text-white">Đăng nhập</h2>
                <p className="text-gray-400 mt-2">Nhập thông tin tài khoản của bạn</p>
              </div>
            </div>

            {/* 2. Form Section - Dùng gap-6 để chia các ô input */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              
              {/* Email Group - Dùng gap-2 để chia Label và Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-300 ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                  </div>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="name@example.com"
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
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className="w-full bg-[#2a2a40] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                  />
                </div>
                {errors.password && <p className="text-xs text-red-400 ml-1">{errors.password.message}</p>}
              </div>

              {/* Forgot Password & Button Group - Dùng gap-4 */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex justify-end">
                  <a href="#" className="text-sm font-medium text-purple-400 hover:text-purple-300">Quên mật khẩu?</a>
                </div>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-lg hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-purple-500/30 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? "Đang xử lý..." : "Đăng nhập"}
                </button>
              </div>
            </form>

            {/* 3. Footer Section */}
            <p className="text-center text-gray-400">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="font-bold text-purple-400 hover:text-purple-300">Đăng ký ngay</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};