import { Link } from "react-router-dom";
import { StarryBackground } from "../components/StarryBackground";

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated Starry Background */}
      <StarryBackground />

      {/* Main Content - Centered */}
      <div className="z-10 flex flex-col 
      items-center justify-center text-center 
      gap-6
      p-12
      w-full max-w-lg
      mx-4
      bg-[#1a1a2e]/80 backdrop-blur-xl rounded-xl
      border border-white/10">
      
        
        {/* Logo */}
        <div className="relative">
          <img
            src="https://i.pinimg.com/736x/76/eb/c7/76ebc7c1a62cf4f81ba450a10d266388.jpg"
            alt="Logo"
            className="w-28 h-28 rounded-full object-cover border-4 border-white/20"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          USER REGISTRATION
        </h1>
          
        {/* Subtitle */}
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-md">
          Đăng ký, đăng nhập và quản lý tài khoản của bạn một cách{" "}
          <span className="text-purple-400 font-medium">an toàn</span> và{" "}
          <span className="text-purple-400 font-medium">nhanh chóng</span>.
        </p>

        {/* Auth Buttons - Side by side */}
        <div className="flex flex-row gap-6">
          <Link
            to="/login"
            className="min-w-[150px] min-h-[40px] px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-lg
              flex items-center justify-center
              hover:from-violet-500 hover:to-purple-500 transition-all duration-300 
              shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 
              hover:scale-105 active:scale-95"
          >
            Đăng nhập
          </Link>

          <Link
            to="/register"
            className="min-w-[150px] min-h-[40px] px-8 py-3 rounded-full bg-transparent border-2 border-white/30 text-white font-semibold text-lg
              flex items-center justify-center
              hover:bg-white/10 hover:border-white/50 transition-all duration-300 
              hover:scale-105 active:scale-95"
          >
            Đăng ký
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          © 2025 <span className="text-purple-400">Tống Dương Thái Hòa - 23120262</span> - HCMUS - WAD IA06
        </p>
      </div>
    </div>
  );
};