"use client";

import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = () => {
      const storedUser = localStorage.getItem("agrifinai_user");
      const storedToken = localStorage.getItem("agrifinai_token");
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };
    
    checkUser();
    
    // Listen for storage changes (logout from another tab)
    window.addEventListener('storage', checkUser);
    
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navItems = [
    { href: "/home", label: "Home", icon: "🏠" },
    { href: "/weather", label: "Weather", icon: "⛅" },
    { href: "/news", label: "News", icon: "📰" },
    { href: "/loan", label: "Loan", icon: "💰" },
    { href: "/soil-health", label: "Soil Health", icon: "🌱" }
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-green-100 shadow-sm">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-24">
            
            {/* Logo Section */}
            <Link href="/home" className="flex items-center gap-3 flex-shrink-0 group hover:opacity-90 transition-opacity duration-300">
              <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white rounded-2xl p-2.5 font-bold text-2xl w-14 h-14 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                A
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="text-2xl font-black text-gray-900 tracking-tight">
                  Agri<span className="text-green-600">Fin</span>AI
                </div>
                <div className="text-xs font-bold text-green-600 tracking-wide">SMART FARMING</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 flex-1 ml-12">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-0 py-2.5 text-gray-700 font-bold text-sm rounded-xl hover:text-green-700 hover:bg-green-50 transition-all duration-300 group relative whitespace-nowrap"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </Link>
              ))}
            </div>

            {/* Search Box */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-full px-6 py-3 hover:shadow-md transition-shadow duration-300 border border-gray-200 group cursor-text w-72">
                <span className="text-xl group-hover:text-green-600 transition-colors duration-300">🔍</span>
                <input
                  type="text"
                  placeholder="Search products / region"
                  className="bg-transparent focus:outline-none ml-4 w-full text-gray-800 placeholder:text-gray-500 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0 ml-6">
              {/* Sell Button */}
              <Link
                href="/sell"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-7 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group text-sm"
              >
                <span>🚀</span>
                <span>Sell</span>
              </Link>

              {/* Theme Toggle */}
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-5 py-3 rounded-xl transition-all duration-300 border-2 border-gray-300 hover:border-green-400 text-lg hover:text-green-600">
                🌙
              </button>

              {/* Divider */}
              <div className="w-px h-8 bg-gray-300"></div>

              {/* Profile Section - Only show when logged in */}
              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-3 hover:bg-gray-50 px-4 py-2.5 rounded-xl transition-all duration-300 group border-2 border-transparent hover:border-green-200"
                >
                  <div className="relative">
                    <Image
                      src={assets.noAvatar}
                      alt="Profile"
                      height={44}
                      width={44}
                      className="rounded-full border-3 border-green-500 shadow-md group-hover:shadow-lg transition-shadow"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden xl:block text-left">
                    <div className="text-sm font-bold text-gray-900">{user.name}</div>
                    <div className="text-xs text-green-600 font-semibold">👨‍🌾 {user.role || 'Farmer'}</div>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-3xl p-2.5 hover:bg-gray-100 rounded-xl transition-colors duration-300 text-gray-800"
            >
              {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-green-100 shadow-lg">
          <div className="px-6 py-6 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-green-50 transition-all duration-300 font-bold text-gray-800 hover:text-green-700 group border-l-4 border-transparent hover:border-green-500"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            
            <div className="pt-4 border-t-2 border-gray-200 space-y-3">
              {/* Mobile Search */}
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 hover:bg-gray-200 transition-colors duration-300">
                <span className="text-lg">🔍</span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent focus:outline-none ml-3 w-full text-gray-800 placeholder:text-gray-500 text-sm font-semibold"
                />
              </div>

              {/* Sell Button Mobile */}
              <Link
                href="/sell"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-5 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>🚀</span>
                <span>Sell Product</span>
              </Link>

              {/* Profile Mobile - Only show when logged in */}
              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center justify-center gap-2 hover:bg-green-50 px-5 py-4 rounded-xl font-bold text-gray-800 hover:text-green-700 transition-all duration-300 border-2 border-gray-200 hover:border-green-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>👤</span>
                  <span>Profile - {user.name}</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-4 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>🔐</span>
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header