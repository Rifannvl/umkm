import React, { useState, useEffect } from "react";
import dataUMKM from "../pages/data/DataUMKM";
import { FaShoppingCart } from "react-icons/fa";
import Navbar from "../components/Navbar";

export default function Home() {
  const { tentangKami, produkUnggulan, callToAction } = dataUMKM;
  const [selectedProduk, setSelectedProduk] = useState(null);
  const [showAllProdukModal, setShowAllProdukModal] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState([]); // State untuk keranjang
  const [cartVisible, setCartVisible] = useState(false); // Untuk menampilkan cart
  const testimonies = dataUMKM.testimoni;
  const totalSlides = testimonies.length;

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonies[(currentIndex + i) % totalSlides]);
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 3) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 3 + totalSlides) % totalSlides);
  };

  const handleProdukClick = (produk) => {
    setSelectedProduk(produk);
  };

  const closeModal = () => {
    setSelectedProduk(null);
  };

  const handleAddToCart = (produk) => {
    setCart((prevCart) => [...prevCart, produk]);
  };

  const handleRemoveFromCart = (produkId) => {
    setCart(cart.filter((item) => item.id !== produkId));
  };

  const handleCTA = () => {
    setShowAllProdukModal(true);
  };

  const cartCount = cart.length;

  const calculateTotal = () => {
    return cart.reduce((total, produk) => total + produk.harga, 0).toFixed(2);
  };

  return (
    <div className="bg-slate-50">
      <div className="pb-10">
        <Navbar
          cartCount={cartCount}
          onCartClick={() => setCartVisible(true)}
        />
      </div>

      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white w-full text-center rounded-md shadow-lg">
          <img
            src={tentangKami.logoUrl}
            alt="UMKM Logo"
            className="w-32 mx-auto"
          />
          <h1 className="text-4xl font-extrabold mt-4">{tentangKami.nama}</h1>
          <p className="mt-2 text-lg">{tentangKami.deskripsi}</p>
        </div>

        {/* Produk Unggulan */}
        <div className="w-full mt-12 ">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10 animate-fade-in">
            Produk Unggulan Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {produkUnggulan.slice(0, 3).map((produk) => (
              <div
                key={produk.id}
                onClick={() => handleProdukClick(produk)}
                className="cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 ease-in-out animate-slide-up"
              >
                <img
                  src={produk.gambar}
                  alt={produk.nama}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-indigo-800">
                    {produk.nama}
                  </h3>
                  <p className="text-gray-600 mt-2 truncate">
                    {produk.deskripsi}
                  </p>
                  <p className="text-xl text-indigo-800 mt-2">
                    Rp {produk.harga}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering modal
                      handleAddToCart(produk);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full mt-4"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          id="produk"
          className="bg-indigo-600 text-white text-center py-12 mt-12 rounded-lg shadow-lg px-8 w-full animate-fade-in scroll-mt-20"
        >
          <h2 className="text-4xl font-extrabold mb-4 text-shadow-md">
            {callToAction.judul}
          </h2>
          <p className="text-lg mb-6">{callToAction.deskripsi}</p>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleCTA}
              className="bg-yellow-400 text-gray-800 py-3 px-8 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl"
            >
              {callToAction.tombolText} <FaShoppingCart className="text-lg" />
            </button>
          </div>
        </div>

        {/* Testimoni Carousel */}
        <div id="testimoni" className="w-full mt-16 scroll-mt-20 ">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10 animate-fade-in">
            💬 Apa Kata Mereka?
          </h2>
          <div className="relative max-w-6xl mx-auto w-full overflow-hidden">
            {/* Testimoni Cards */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 transition-transform duration-700 ease-in-out transform animate-slide-up"
              key={currentIndex}
            >
              {visibleTestimonials.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-indigo-300 object-cover"
                  />
                  <h3 className="font-semibold text-lg text-indigo-800">
                    {item.nama}
                  </h3>
                  <p className="text-gray-600 mt-2 italic">"{item.komentar}"</p>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 px-6">
              <button
                onClick={prevSlide}
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-full px-4 py-2 shadow transition"
              >
                ⟨ Sebelumnya
              </button>
              <button
                onClick={nextSlide}
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-full px-4 py-2 shadow transition"
              >
                Selanjutnya ⟩
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: Math.ceil(totalSlides / 3) }).map(
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i * 3)}
                    className={`w-3 h-3 rounded-full ${
                      i * 3 === currentIndex ? "bg-indigo-500" : "bg-gray-300"
                    }`}
                  ></button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Kontak */}
        <div id="kontak" className="w-full mt-16 px-4 scroll-mt-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-[1.02]">
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6 animate-fade-in">
              📞 Hubungi Kami
            </h2>
            <div className="grid md:grid-cols-2 gap-10 items-center animate-slide-up">
              {/* Informasi Kontak */}
              <div className="space-y-4 text-gray-700 text-lg">
                <div className="flex items-start gap-3">
                  <span className="text-indigo-600 text-2xl">📍</span>
                  <p>
                    <strong>Alamat:</strong> {dataUMKM.kontak.alamat}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-600 text-2xl">📞</span>
                  <p>
                    <strong>Telepon:</strong> {dataUMKM.kontak.telepon}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-600 text-2xl">✉️</span>
                  <p>
                    <strong>Email:</strong> {dataUMKM.kontak.email}
                  </p>
                </div>
              </div>

              {/* Google Maps */}
              <div className="w-full h-60 overflow-hidden rounded-xl shadow-md transition-all duration-500 hover:scale-105">
                <iframe
                  src={dataUMKM.kontak.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  className="rounded-xl w-full h-full"
                  loading="lazy"
                  title="Lokasi UMKM"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Produk Detail */}
        {selectedProduk && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
              <button
                className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold"
                onClick={closeModal}
              >
                ×
              </button>
              <img
                src={selectedProduk.gambar}
                alt={selectedProduk.nama}
                className="w-full h-60 object-cover rounded"
              />
              <h2 className="text-xl font-bold mt-4">{selectedProduk.nama}</h2>
              <p className="text-gray-700 mt-2">{selectedProduk.deskripsi}</p>
            </div>
          </div>
        )}

        {/* Cart Modal */}
        {cartVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative">
              <button
                className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold cursor-pointer"
                onClick={() => setCartVisible(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold">Keranjang Belanja</h2>
              {cart.length === 0 ? (
                <p className="text-gray-600 mt-4">Keranjang Anda kosong</p>
              ) : (
                <div>
                  <ul>
                    {cart.map((produk) => (
                      <li
                        key={produk.id}
                        className="flex justify-between items-center mt-4"
                      >
                        <div className="flex items-center">
                          <img
                            src={produk.gambar}
                            alt={produk.nama}
                            className="w-12 h-12 object-cover rounded mr-4"
                          />
                          <span>{produk.nama}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(produk.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Hapus
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-lg font-semibold">
                    Total: Rp {calculateTotal()}
                  </div>
                  <div className="flex justify-center mt-6">
                    <button
                      className="bg-indigo-600 text-white py-2 px-6 rounded-full font-semibold"
                      onClick={() => alert("Pesanan berhasil")}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {showAllProdukModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-5xl w-full max-h-[80vh] overflow-y-auto rounded-lg shadow-xl p-6 relative">
            <button
              onClick={() => setShowAllProdukModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center">
              Semua Produk UMKM
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {produkUnggulan.map((produk) => (
                <div
                  key={produk.id}
                  className="border p-4 rounded shadow hover:shadow-md transition"
                >
                  <img
                    src={produk.gambar}
                    alt={produk.nama}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold text-lg text-indigo-800">
                    {produk.nama}
                  </h3>
                  <p className="text-sm text-gray-600">{produk.deskripsi}</p>
                  <p className="font-bold text-indigo-600 mt-2">
                    Rp {produk.harga}
                  </p>
                  <button
                    onClick={() => handleAddToCart(produk)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full mt-3"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ikon Keranjang */}
      <div
        className="fixed bottom-10 right-10 bg-yellow-500 text-white p-4 rounded-full shadow-lg flex items-center gap-2 cursor-pointer"
        onClick={() => setCartVisible(true)}
      >
        <FaShoppingCart />
        <span className="font-semibold">{cartCount} Produk</span>
      </div>
    </div>
  );
}
