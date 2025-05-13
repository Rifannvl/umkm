// components/Navbar.js
import React, { useState } from "react";
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/logo.svg";

export default function Navbar({ cartCount, onCartClick, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-around">
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

        {/* Search (Desktop Only) */}
        <div className="relative w-full max-w-xs mx-4 hidden md:block">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Cari produk..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
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
          className="flex items-center gap-2 cursor-pointer relative ml-8"
          onClick={onCartClick}
        >
          <FaShoppingCart className="text-indigo-700 text-xl" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              {cartCount}
            </span>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden ml-1">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-indigo-700 text-xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pt-4 pb-6 shadow-lg border-t border-gray-200">
          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Cari produk..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
          </div>

          {/* Menu Links */}
          <div className="flex flex-col gap-4 text-gray-700 font-medium">
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
        </div>
      )}
    </nav>
  );
}
