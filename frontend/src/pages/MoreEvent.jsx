import { ActivityCard } from "@/components/ActivityCard";
import { EventPagination } from "@/components/EventPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const MoreEvent = () => {
  const [cards, setCards] = useState([]); // Menyimpan data event
  const [searchParams, setSearchParams] = useSearchParams(); // Mengatur parameter pencarian di URL
  const [eventName, setEventName] = useState(""); // Untuk input pencarian event
  const [hasNext, setHasNext] = useState(false); // Apakah ada halaman berikutnya
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini

  // Mengatur halaman selanjutnya
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Mengatur halaman sebelumnya
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Fungsi pencarian event
  const searchEvent = () => {
    if (eventName.trim()) {
      searchParams.set("search", eventName.trim());
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
    setCurrentPage(1); // Reset ke halaman pertama saat pencarian
  };

  // Mengambil data event dari API
  const fetchActivity = async () => {
    try {
      const response = await axiosInstance.get("api/event/", {
        params: {
          page: currentPage,
          search: searchParams.get("search") || "",
        },
      });

      const { results, next, previous } = response.data;

      setCards(results);
      setHasNext(Boolean(next)); // Update state for next page existence
    } catch (err) {
      console.error("Error fetching events:", err);
      setCards([]); // Clear cards in case of error
    }
  };

  // Fetch data setiap kali `page` atau `search` berubah
  useEffect(() => {
    fetchActivity();
  }, [currentPage, searchParams.get("search")]); // Listen to search and page changes

  // Inisialisasi halaman saat pertama kali komponen di-render
  useEffect(() => {
    const initialPage = Number(searchParams.get("page")) || 1;
    if (initialPage < 1) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
    setCurrentPage(initialPage); // Set initial page from URL parameter
  }, []); // Only run on component mount

  // Render kartu event
  const cardsActivity = cards.length
    ? cards.map((card) => {
        const image =
          card.imageURL && card.imageURL.length > 0
            ? card.imageURL[0].image
            : "";
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
      })
    : "Tidak ada event yang ditemukan."; // Fallback jika tidak ada event

  return (
    <main className="min-h-screen md:w-auto mx-auto px-8 lg:px-16 mt-20">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold ">Cari Aktivitas</p>
        <div className="sm:w-1/2 flex gap-3 mb-8 ">
          <Input
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Cari Event.."
          />
          <Button
            className="text-white bg-mainColor hover:bg-mainColor hover:opacity-60"
            onClick={searchEvent}
          >
            Cari
          </Button>
          <Button variant="outline" className="p-3 flex justify-end">
            <Filter className="mr-1" />
            Filter
          </Button>
        </div>
      </div>
      <div className="grid justify-start sm:justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {cardsActivity}
      </div>

      <EventPagination
        currentPage={currentPage}
        hasNext={hasNext}
        onPreviousPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </main>
  );
};
