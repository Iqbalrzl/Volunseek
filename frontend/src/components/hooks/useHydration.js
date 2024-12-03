// useHydration.js
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const dispatch = useDispatch();

  const hydrateAuth = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setIsHydrated(true); // Jika tidak ada token, set hydrated menjadi true tanpa melakukan apa-apa
        return;
      }

      // Mengambil data pengguna menggunakan token
      const userResponse = await axiosInstance.get("auth/users/me", {
        headers: {
          Authorization: `JWT ${accessToken}`, // Pastikan header Authorization benar
        },
      });

      // Jika response ada, dispatch data user ke Redux
      if (userResponse && userResponse.data) {
        const userData = userResponse.data;
        dispatch({
          type: "USER_LOGIN",
          payload: {
            username: userData.username,
            email: userData.email, // Menambahkan email jika diperlukan
            id: userData.id,
            first_name: userData.first_name, // Pastikan first_name tersedia
            last_name: userData.last_name, // Pastikan last_name tersedia
          },
        });
      }
    } catch (err) {
      console.log("Error fetching user data:", err);
    } finally {
      setIsHydrated(true); // Set hydrated menjadi true setelah proses selesai
    }
  };

  useEffect(() => {
    hydrateAuth();
  }, []); // Menjalankan hanya sekali saat komponen pertama kali dimuat

  return {
    hydration: isHydrated,
  };
};
