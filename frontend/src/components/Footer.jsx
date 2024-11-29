import { WebTitle } from "./WebTitle";

export const Footer = () => {
  return (
    <footer className="min-h-16 border-t md:w-auto  px-8 lg:px-16 flex items-center justify-between bg-footerColor">
      <div className="flex-col py-5">
        <WebTitle />
        <p className="text-white text-sm font-light">
          VolunSeek adalah wadah untuk menyatukan <br /> relawan dengan acara
          yang kami kelola dengan terstruktur
        </p>
      </div>
    </footer>
  );
};
