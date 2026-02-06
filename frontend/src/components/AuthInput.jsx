import React from 'react';

export const AuthInput = ({ label, icon: Icon, type = "text", ...props }) => (
  <div className="mb-4 group">
    <label className="block text-white/50 text-[10px] mb-1 uppercase tracking-[0.2em] ml-1 font-semibold group-focus-within:text-[#D4AF37] transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-[#D4AF37] transition-colors">
        {Icon && <Icon size={16} strokeWidth={1.5} />}
      </div>
      <input
        type={type}
        {...props}
        className="w-full bg-white/[0.03] border border-white/10 p-3 pl-12 rounded-xl text-white text-sm placeholder:text-gray-600 focus:border-[#D4AF37]/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-[#D4AF37]/5 outline-none transition-all duration-300 backdrop-blur-sm"
      />
    </div>
  </div>
);