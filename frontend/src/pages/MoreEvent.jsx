import { ActivityCard } from "@/components/ActivityCard";
import { EventPagination } from "@/components/EventPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { axiosInstance } from "@/lib/axios";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const MoreEvent = () => {
  const [cards, setCards] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventName, setEventName] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Fungsi untuk menangani pencarian event
  const searchEvent = () => {
    if (eventName.trim()) {
      setSearchParams({ search: eventName.trim(), page: 1 });
      setCurrentPage(1);
    } else {
      setSearchParams({ page: 1 });
      setCurrentPage(1);
    }
  };

  // Menangani input saat tombol Enter ditekan
  const handleInput = (e) => {
    if (e.key === "Enter") {
      searchEvent();
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      const nextPageParams = new URL(nextPage).searchParams;
      setSearchParams(nextPageParams); // Perbarui search params dengan URL halaman berikutnya
      setCurrentPage((prevPage) => prevPage + 1); // Increment current page
    }
  };

  const handlePrevPage = () => {
    if (previousPage) {
      const previousPageParams = new URL(previousPage).searchParams;
      setSearchParams(previousPageParams); // Perbarui search params dengan URL halaman sebelumnya
      setCurrentPage((prevPage) => prevPage - 1); // Decrement current page
    }
  };

  // Fungsi untuk mengambil data berdasarkan pencarian dan halaman
  const fetchActivity = async () => {
    try {
      const response = await axiosInstance.get("api/event/search", {
        params: {
          page: currentPage,
          search: searchParams.get("search") || "",
        },
      });

      const { results, next, previous, count } = response.data;

      setCards(results);
      setNextPage(next);
      setPreviousPage(previous);
      setTotalCount(count);
    } catch (err) {
      console.error("Error fetching events:", err);
      setCards([]);
    }
  };

  // Efek untuk memuat data setiap kali page atau search params berubah
  useEffect(() => {
    fetchActivity();
  }, [currentPage, searchParams]); // Perubahan pada currentPage atau searchParams akan memicu fetchActivity

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
    : "Tidak ada event yang ditemukan.";

  // Menghitung jumlah halaman berdasarkan total data dan page size
  const pageSize = cards.length ? cards.length : totalCount;
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <main className="min-h-screen md:w-auto mx-auto px-8 lg:px-16 mt-20">
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-semibold mb-2">Cari Aktivitas</p>
        <div className="sm:w-1/2 flex gap-3 mb-12">
          <Input
            value={eventName}
            onKeyDown={handleInput}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Cari Event.."
          />
          <Button
            className="text-white bg-mainColor hover:bg-mainColor hover:opacity-60"
            onClick={searchEvent}
          >
            Cari
          </Button>
        </div>
      </div>

      {/* Render cards */}
      <div className="grid justify-start sm:justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {cardsActivity}
      </div>

      {/* Pagination */}
      <EventPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNext={Boolean(nextPage)}
        hasPrevious={Boolean(previousPage)}
        onPreviousPage={handlePrevPage}
        onNextPage={handleNextPage}
      />

      <Toaster />
    </main>
  );
};
