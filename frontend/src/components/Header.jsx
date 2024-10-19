import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { WebTitle } from "./WebTitle";

export const Header = () => {
  const navbarItems = ["Tentang Kami", "Cari Aktivitas"];

  return (
    <header className="h-14 md:w-auto border-b border-none flex items-center bg-customGray px-8 lg:px-16 gap-x-10 fixed top-0 left-0 right-0 z-50">
      <WebTitle />

      {/* navbar button */}
      <div className="flex flex-1 items-center gap-x-8 max-w-fit">
        {navbarItems.map((item, idx) => (
          <p key={idx} className="hover:cursor-pointer ">
            {item}
          </p>
        ))}
      </div>

      <div className="flex flex-1 justify-end items-center gap-6">
        <Link to="/login">
          <Button
            variant="secondary"
            size="default"
            className="bg-white text-[#1ABC9C] border-none hover:bg-[#1ABC9C] hover:text-white transition-colors duration-200"
          >
            Masuk
          </Button>
        </Link>
        <Button
          variant="secondary"
          size="default"
          className="bg-white text-[#1ABC9C] border-none hover:bg-[#1ABC9C] hover:text-white transition-colors duration-200"
        >
          Daftar
        </Button>
      </div>
    </header>
  );
};
