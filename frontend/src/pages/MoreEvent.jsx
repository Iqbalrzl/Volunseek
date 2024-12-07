import { ActivityCard } from "@/components/ActivityCard";
import { EventPagination } from "@/components/EventPagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const MoreEvent = () => {
  const [cards, setCards] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventName, setEventName] = useState("");
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (previousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const searchEvent = () => {
    if (eventName.trim()) {
      searchParams.set("search", eventName.trim());
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
    setCurrentPage(1);
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      searchEvent();
    }
  };

  const fetchActivity = async () => {
    try {
      const response = await axiosInstance.get("api/event/search", {
        params: {
          page: currentPage,
          search: searchParams.get("search") || "",
        },
      });

      const { results, next, previous } = response.data;

      setCards(results);
      setNextPage(next);
      setPreviousPage(previous);
    } catch (err) {
      console.error("Error fetching events:", err);
      setCards([]);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, [currentPage, searchParams.get("search")]);

  useEffect(() => {
    const initialPage = Number(searchParams.get("page")) || 1;
    if (initialPage < 1) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
    setCurrentPage(initialPage);
  }, []);

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

  return (
    <main className="min-h-screen md:w-auto mx-auto px-8 lg:px-16 mt-20">
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-semibold mb-2">Cari Aktivitas</p>
        <div className="sm:w-1/2 flex gap-3 mb-12 ">
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
          <Button variant="outline" className="p-3 flex justify-end">
            <Filter className="mr-1" />
            Filter
          </Button>
        </div>
      </div>
      <div className="grid justify-start sm:justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {cardsActivity}
      </div>

      <EventPagination
        className="pb-10"
        currentPage={currentPage}
        hasNext={Boolean(nextPage)}
        hasPrevious={Boolean(previousPage)}
        onPreviousPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </main>
  );
};
