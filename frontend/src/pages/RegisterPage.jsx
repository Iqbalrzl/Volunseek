import { useState } from "react";
import loginTitle from "@/assets/images/loginTitle.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios"; // Konfigurasi axios harus sesuai
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("auth/users/", formData);
      setMessage("Registration successful! Please login.");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
      setMessage("");
    }
  };

  return (
    <main className="min-h-screen bg-[#D1F2EB] flex justify-center items-center">
      <div className="bg-white border rounded-lg shadow-lg p-8 flex flex-col sm:flex-row max-w-4xl w-full mx-5 gap-8">
        <div className="flex justify-center items-center mb-10 sm:mb-0">
          <img
            src={loginTitle}
            alt="Login Illustration"
            className="w-4/6 h-auto rounded-lg object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#1ABC9C] text-white hover:bg-[#1ABC9C] hover:opacity-60"
            >
              Register
            </Button>
            {message && (
              <p className="text-green-500 text-center mt-2">{message}</p>
            )}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <Link to={"/login"}>
              <p className="mt-4 text-sky-600">Sudah punya akun</p>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};
