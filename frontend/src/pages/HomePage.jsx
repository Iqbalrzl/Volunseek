import { ActivityCard } from "@/components/ActivityCard";
import { ImageSlide } from "@/components/ImageSlide";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [cards, setCards] = useState([]); // Menyimpan daftar acara (event)
  const [loadingCards, setLoadingCards] = useState(true); // Status loading
  const [error, setError] = useState(null); // Status error

  // Mengambil data acara dari API
  const fetchActivity = async () => {
    setLoadingCards(true);
    setError(null); // Reset error ketika memulai pengambilan data
    try {
      const res = await axiosInstance.get("/api/event/");
      if (res.data && res.data.results) {
        const maxCards = res.data.results.slice(0, 8);
        setCards(maxCards);
      } else {
        setError("Data acara tidak ditemukan.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal mengambil data acara.");
    } finally {
      setLoadingCards(false); // Menghentikan loading setelah API request selesai
    }
  };

  useEffect(() => {
    fetchActivity(); // Panggil fungsi fetchActivity saat komponen pertama kali dirender
  }, []);

  // Maping data event ke dalam komponen ActivityCard
  const cardsActivity = cards.map((card) => {
    const image =
      card.imageURL && card.imageURL.length > 0 ? card.imageURL[0].image : "";
    return (
      <ActivityCard
        key={card.id}
        id={card.id}
        imageURL={image}
        name_event={card.name_event}
        event_type={card.event_type}
        start_event={card.start_event}
        end_event={card.end_event}
        location_event={card.location_event}
      />
    );
  });

  return (
    <main className="min-h-[70vh] md:w-auto mx-auto px-8 lg:px-16 mt-20">
      {/* Banner with ImageSlide */}
      <div className="pb-10 md:w-auto text-center flex flex-col items-center">
        <div className="relative flex justify-center w-full">
          <ImageSlide />

          <div className="absolute bottom-8">
            <p className="text-white font-medium text-3xl mb-8">
              Bersama kita bisa membuat perubahan. Jadilah relawan!
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-[#1ABC9C] border-none hover:bg-[#1ABC9C] hover:text-white transition-colors duration-200"
            >
              Jadi Relawan Sekarang
            </Button>
          </div>
        </div>
      </div>

      {/* Program Kami Section */}
      <div className="flex-auto">
        <p className="text-3xl font-semibold mb-6">PROGRAM KAMI</p>
        <div className="flex"></div>
      </div>

      {/* Card Section */}
      {loadingCards ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          {/* Ganti teks loading dengan spinner atau indikator loading lainnya */}
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[50vh] text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {cardsActivity}
          </div>

          {cards.length > 0 && (
            <div className="flex justify-center mt-8 mb-12">
              <Link to={"/more-event"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#1ABC9C] text-[#1ABC9C] hover:bg-[#1ABC9C] hover:text-white transition-colors duration-200"
                >
                  Lihat Lebih Banyak
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </main>
  );
};
