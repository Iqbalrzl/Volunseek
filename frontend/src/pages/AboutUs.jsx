import { Link } from "react-router-dom";
import aboutImg from "@/assets/images/aboutImg.png";

export const AboutUs = () => {
  return (
    <div className="min-h-[85vh]">
      <div className="relative bg-[#D1F2EB] sm:rounded-b-full">
        <div className="mx-auto mt-12 px-4 py-20 sm:px-6 lg:px-5">
          <h2 className="text-3xl font-bold sm:text-4xl text-slate-800 text-center">
            Kenali VolunSeek Lebih Dekat
          </h2>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center flex-col md:flex-row md:items-center md:gap-8">
          <div className="md:w-1/2">
            <img
              src={aboutImg}
              alt=""
              className="mx-auto max-w-full h-auto mb-6 md:mb-0 rounded-md shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4 text-slate-800">
              Tentang VolunSeek
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              VolunSeek adalah platform yang menghubungkan relawan dengan
              peluang bermakna untuk melayani komunitas lokal mereka. Misi kami
              adalah untuk membuat orang-orang dapat dengan mudah menemukan dan
              terlibat dalam sebab-sebab yang mereka pedulikan.
            </p>
            <div className="mt-6">
              <Link
                to="/volunteer"
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primaryDark inline-block"
              >
                Bergabung Sekarang
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
