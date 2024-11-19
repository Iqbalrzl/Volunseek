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
  const [hasNext, setHasNext] = useState(true);

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);
    setSearchParams(searchParams);
  };
  const handlePrevPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);
    setSearchParams(searchParams);
  };

  const searchEvent = () => {
    if (eventName) {
      searchParams.set("search", eventName);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const fetchActivity = async () => {
    try {
      const res = await axiosInstance.get("/cards", {
        params: {
          _per_page: 16,
          _page: Number(searchParams.get("page")),
          name_event: searchParams.get("search"),
        },
      });

      setHasNext(Boolean(res.data.next));
      setCards(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (searchParams.get("page")) {
      fetchActivity();
    }
  }, [searchParams.get("page"), searchParams.get("search")]);

  useEffect(() => {
    if (!searchParams.get("page") || searchParams.get("page") < 1) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, []);

  const cardsActivity = cards.map((card) => {
    return (
      <ActivityCard
        key={card.id}
        id={card.id}
        imageUrl={card.imageUrl}
        name_event={card.name_event}
        event_type={card.event_type}
        date_event={card.date_event}
        location_event={card.location_event}
      />
    );
  });

  return (
    <main className="min-h-[70vh] md:w-auto mx-auto px-8 lg:px-16 mt-20">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold ">Cari Aktivitas</p>
        <div className="sm:w-1/2 flex gap-3 mb-8 ">
          <Input
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
        currentPage={Number(searchParams.get("page"))}
        hasNext={hasNext}
        onPreviousPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </main>
  );
};
