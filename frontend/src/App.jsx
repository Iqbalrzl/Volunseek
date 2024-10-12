import { ActivityCard } from "./components/ActivityCard";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ImageSlide } from "./components/ImageSlide";
import { Button } from "./components/ui/button";

const rawData = [
  {
    imageUrl:
      "https://indorelawan-production.nos.wjv-1.neo.id/uploads/gallery/2024-10-09/Activity_1728445364683_Jadi-Relawan.jpg",
    event_type: "lingkungan",
    name_event: "AKTIVITAS 1",
    date_event: "17 Oktober 2024",
    location_event: "Taman Hutan Raya, Bandung",
  },
  {
    imageUrl:
      "https://indorelawan-production.nos.wjv-1.neo.id/uploads/gallery/2024-10-09/Activity_1728445364683_Jadi-Relawan.jpg",
    event_type: "lingkungan",
    name_event: "AKTIVITAS 2",
    date_event: "1 Oktober 2024",
    location_event: "Taman Hutan Raya, Bandung",
  },
  {
    imageUrl:
      "https://indorelawan-production.nos.wjv-1.neo.id/uploads/gallery/2024-10-09/Activity_1728445364683_Jadi-Relawan.jpg",
    event_type: "lingkungan",
    name_event: "AKTIVITAS 2",
    date_event: "1 Oktober 2024",
    location_event: "Taman Hutan Raya, Bandung",
  },
  {
    imageUrl:
      "https://indorelawan-production.nos.wjv-1.neo.id/uploads/gallery/2024-10-09/Activity_1728445364683_Jadi-Relawan.jpg",
    event_type: "lingkungan",
    name_event: "AKTIVITAS 2",
    date_event: "1 Oktober 2024",
    location_event: "Taman Hutan Raya, Bandung",
  },
  {
    imageUrl:
      "https://indorelawan-production.nos.wjv-1.neo.id/uploads/gallery/2024-10-09/Activity_1728445364683_Jadi-Relawan.jpg",
    event_type: "lingkungan",
    name_event: "AKTIVITAS 2",
    date_event: "1 Oktober 2024",
    location_event: "Taman Hutan Raya, Bandung",
  },
];

function App() {
  const cards = rawData.map((card) => {
    return (
      <ActivityCard
        key={card.key}
        imageUrl={card.imageUrl}
        name_event={card.name_event}
        event_type={card.event_type}
        date_event={card.date_event}
        location_event={card.location_event}
      />
    );
  });

  return (
    <>
      <Header />
      <main className="min-h-[80vh] md:w-auto mx-auto px-8 lg:px-16 mt-20">
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

        <div className="grid justify-start sm:justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {cards}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
