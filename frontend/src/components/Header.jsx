import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { WebTitle } from "./WebTitle";
import { useSelector } from "react-redux";
// import { useEffect } from "react";
import { UserRound } from "lucide-react";

export const Header = () => {
  const navbarItems = [
    { label: "Tentang Kami", path: "/aboutus" }, // Updated path
    { label: "Cari Aktivitas", path: "/more-event" },
  ];

  const userSelector = useSelector((state) => state.user);

  return (
    <header className="h-14 md:w-auto border-b border-none flex items-center bg-customGray px-8 lg:px-16 gap-x-10 fixed top-0 left-0 right-0 z-50">
      <WebTitle />

      {/* navbar button */}
      <div className="flex flex-1 items-center gap-x-8 max-w-fit">
        {navbarItems.map((item, idx) => (
          <Link key={idx} to={item.path} className="hover:cursor-pointer">
            <p>{item.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-1 justify-end items-center gap-6">
        {userSelector.id ? (
          <div className="flex gap-2 justify-center items-center">
            <div className="!mx-0 p-2 flex justify-center items-center">
              <p className="text-xl font-medium">{userSelector.username}</p>
            </div>

            <UserRound className="h-8 w-8" />
          </div>
        ) : (
          <>
            <Link to="/login">
              <Button
                variant="secondary"
                size="default"
                className="bg-white text-[#1ABC9C] border-none hover:bg-[#1ABC9C] hover:text-white transition-colors duration-200"
              >
                Masuk
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="secondary"
                size="default"
                className="bg-white text-[#1ABC9C] border-none hover:bg-[#1ABC9C] hover:text-white transition-colors duration-200"
              >
                Daftar
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
