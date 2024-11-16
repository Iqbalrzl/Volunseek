import { Button } from "@/components/ui/button";
import loginTitle from "@/assets/images/loginTitle.png";

export const LoginPage = () => {
  return (
    <>
      <main className="min-h-screen bg-[#D1F2EB] flex justify-center items-center">
        <div className="bg-white border rounded-lg shadow-lg p-8 flex flex-col sm:flex-row max-w-4xl w-full mx-5 gap-8">
          {/* left Column (Image) */}
          <div className=" flex justify-center items-center mb-10 sm:mb-0 ">
            <img
              src={loginTitle} // Replace with the desired image URL
              alt="Login Illustration"
              className="w-4/6 h-auto rounded-lg object-cover"
            />
          </div>

          {/* right Column (Input Fields) */}
          <div className="flex-1 flex flex-col justify-center ">
            <h2 className="text-2xl font-bold mb-4">Masuk</h2>
            <div className="mb-4">
              <input
                id="username"
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Nama"
              />
            </div>
            <div className="mb-10">
              <input
                id="password"
                type="password"
                className="border border-gray-300 p-2 rounded w-full"
                placeholder="Kata Sandi"
              />
            </div>
            <Button className="w-full bg-[#1ABC9C] text-white hover:bg-[#1ABC9C] hover:opacity-60">
              Masuk
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};
