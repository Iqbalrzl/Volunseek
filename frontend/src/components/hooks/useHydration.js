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
            username: userData.username, // Ambil username dan id dari response API
            id: userData.id,
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
