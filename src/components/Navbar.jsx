// components/Navbar.js
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../assets/logo.svg";

export default function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-xl">
          <img
            src={Logo}
            alt="UMKM Logo"
            className="w-10 bg-violet-600 p-1 rounded-lg"
          />
          <a href="#">
            <span>UMKM Kita</span>
          </a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <a href="#produk" className="hover:text-indigo-600 transition">
            Produk
          </a>
          <a href="#testimoni" className="hover:text-indigo-600 transition">
            Testimoni
          </a>
          <a href="#kontak" className="hover:text-indigo-600 transition">
            Kontak
          </a>
        </div>

        {/* Keranjang */}
        <div
          className="flex items-center gap-2 cursor-pointer relative"
          onClick={onCartClick}
        >
          <FaShoppingCart className="text-indigo-700 text-xl" />
          <span className="text-sm font-semibold text-gray-700">
            {cartCount}
          </span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
