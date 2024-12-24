import { useState } from "react";
import { z } from "zod";
import loginTitle from "@/assets/images/loginTitle.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { Link, useNavigate } from "react-router-dom";

// Skema Validasi Zod
const zodRegisterSchema = z.object({
  username: z
    .string()
    .max(20, { message: "Username maksimal 20 karakter" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username hanya boleh berisi huruf, angka, dan underscore",
    }),

  email: z
    .string()
    .email({ message: "Format email tidak valid" })
    .max(100, { message: "Email terlalu panjang" }),
});

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // State untuk menyimpan error spesifik
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    try {
      zodRegisterSchema.parse(formData);

      setErrors({ username: "", email: "", password: "", general: "" });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = {
          username: "",
          email: "",
          password: "",
          general: "",
        };
        error.errors.forEach((err) => {
          formErrors[err.path[0]] = err.message;
        });
        setErrors(formErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({ username: "", email: "", password: "", general: "" });

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      await axiosInstance.post("auth/users/", formData);

      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        const backendErrors = err.response.data;

        const newErrors = {
          username: "",
          email: "",
          password: "",
          general: "",
        };

        if (backendErrors.username) {
          newErrors.username = "Username sudah digunakan";
        }

        if (backendErrors.email) {
          newErrors.email = "Email sudah terdaftar";
        }
        if (backendErrors.password) {
          newErrors.password = "panjang password minimal 8 karakter";
        }

        // Jika ada error lain yang tidak terduga
        if (Object.keys(backendErrors).length === 0) {
          newErrors.general = "Registrasi gagal. Silakan coba lagi.";
        }

        // Set error
        setErrors(newErrors);
      } else {
        // Error jaringan atau server
        setErrors((prev) => ({
          ...prev,
          general: "Terjadi kesalahan. Silakan coba lagi.",
        }));
      }

      // Matikan loading
      setIsLoading(false);
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
                placeholder="Nama Panggilan"
                value={formData.username}
                onChange={handleInputChange}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Kata Sandi"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            {errors.general && (
              <div className="text-red-500 text-center">{errors.general}</div>
            )}
            <Button
              type="submit"
              className="w-full bg-[#1ABC9C] text-white hover:bg-[#1ABC9C] hover:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? "Akun mu sedang diproses..." : "Daftar"}
            </Button>

            <Link to={"/login"}>
              <p className="mt-4 text-sky-600">Sudah punya akun</p>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};
