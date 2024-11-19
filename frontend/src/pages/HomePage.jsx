import { ActivityCard } from "@/components/ActivityCard";

import { ImageSlide } from "@/components/ImageSlide";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [loadingCards, setloadingCards] = useState(true);

  const CARDS_LIMIT = 8;

  const limitedCards = cards.slice(0, CARDS_LIMIT);

  const cardsActivity = limitedCards.map((card) => {
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

  const fetchActivity = async () => {
    setloadingCards(true);
    try {
      const res = await axiosInstance.get("/cards");
      console.log(res.data);
      setCards(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setloadingCards(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <>
      <main className="min-h-[70vh] md:w-auto mx-auto px-8 lg:px-16 mt-20">
        <div className="pb-10 md:w-auto text-center flex flex-col items-center ">
          <div className="relative flex justify-center w-full">
            <ImageSlide />

            <div className="absolute bottom-8 ">
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

        <div className="flex-auto">
          <p className="text-3xl font-semibold mb-6">PROGRAM KAMI</p>
          <div className="flex"></div>
        </div>
        {/* card section */}

        {loadingCards ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p>Loading...</p>{" "}
            {/* You can replace this with a spinner or any other loading indicator */}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {cardsActivity}
            </div>

            {cards.length >= CARDS_LIMIT && (
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
    </>
  );
};
