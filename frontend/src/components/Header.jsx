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
        <Button variant="secondary" className="">
          Masuk
        </Button>
        <Button variant="secondary">Daftar</Button>
      </div>
    </header>
  );
};
