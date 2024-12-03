import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios";
import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const UserProfilePage = () => {
  const userSelector = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    first_name: userSelector.first_name,
    last_name: userSelector.last_name,
    email: userSelector.email || "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("current_email");
    localStorage.removeItem("current_firstname");
    localStorage.removeItem("current_lastname");
    localStorage.removeItem("current_username");

    dispatch({
      type: "USER_LOGOUT",
    });
  };

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi untuk mengirimkan data ke server dan menyimpan perubahan
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.patch("/auth/users/me/", formData, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      const updatedUserData = res.data;
      console.log("Updated user data:", updatedUserData);

      dispatch({
        type: "USER_UPDATE",
        payload: {
          first_name: updatedUserData.first_name,
          last_name: updatedUserData.last_name,
          email: updatedUserData.email,
        },
      });

      localStorage.setItem("current_firstname", updatedUserData.first_name);
      localStorage.setItem("current_lastname", updatedUserData.last_name);
      localStorage.setItem("current_email", updatedUserData.email);

      alert("Profile berhasil diperbarui");
      setIsEditing(false);
    } catch (err) {
      console.log("Error updating profile:", err.response?.data || err);
      alert("Terjadi kesalahan saat memperbarui profile");
    }
  };

  // Pastikan state formData selalu terupdate ketika userSelector berubah
  useEffect(() => {
    if (userSelector) {
      setFormData({
        first_name: userSelector.first_name || "",
        last_name: userSelector.last_name || "",
        email: userSelector.email || "",
      });
    }
  }, [userSelector]); // Tambahkan userSelector di array dependensi

  return (
    <main className="min-h-screen mt-20 mx-auto md:w-auto px-8 lg:px-16">
      {/* left section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="border bg-customGray w-full md:w-1/4 h-[500px] rounded-xl">
          <div className="flex flex-col justify-center items-center gap-6 py-8">
            <CircleUserRound className="w-20 h-20" />
            <div className="text-center">
              <p className="text-xl font-medium">{userSelector.username}</p>
              <p className="text-sm text-muted-foreground">
                {userSelector.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-end items-center ">
            <Link to={"/"}>
              <Button variant="destructive" onClick={handleLogOut}>
                Keluar
              </Button>
            </Link>
          </div>
        </div>

        {/* right section */}
        <div className="border bg-customGray md:w-3/4 h-[500px] rounded-xl">
          <div className="flex flex-col justify-start py-8 px-8">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label>Nama pengguna</Label>
                <Input
                  name="username"
                  onChange={handleInputChange}
                  value={userSelector.username}
                  disabled // Disable if not editing
                />
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <Label>Nama Depan</Label>
                  <Input
                    name="first_name"
                    onChange={handleInputChange}
                    value={formData.first_name}
                    disabled={!isEditing} // Disable if not editing
                  />
                </div>
                <div className="flex-1">
                  <Label>Nama Belakang</Label>
                  <Input
                    name="last_name"
                    onChange={handleInputChange}
                    value={formData.last_name}
                    disabled={!isEditing} // Disable if not editing
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="w-1/2">
                <Label>Tanggal Lahir</Label>
                <DatePicker />
              </div>
              <div className="w-full flex justify-start gap-4 pt-12">
                <Button
                  type="submit" // Make sure this is a submit button
                  disabled={!isEditing} // Disable if not editing
                  className="bg-mainColor hover:text-mainColor hover:bg-white"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
                  className="bg-white"
                  variant="ghost"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
