import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DetailContent = () => {
  const params = useParams();
  const [moreDetail, setMoreDetail] = useState({
    id: 0,
    volunteerTotal: 0,
    volunteerTask: "",
    volunteerTools: "",
    moreInformation: "",
  });

  const fetchDetail = async () => {
    try {
      const resDetail = await axiosInstance.get(
        "/detailCard/" + params.activityId
      );
      setMoreDetail(resDetail.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div className="flex flex-wrap gap-y-6 sm:gap-y-8">
      {/* Bagian Kiri */}
      <div className="w-full sm:w-1/2 lg:w-1/4">
        <p>Nama Pekerjaan</p>
      </div>

      {/* Bagian Kanan */}
      <div className="w-full sm:w-1/2 lg:w-3/4">
        <span className="text-muted-foreground">
          {moreDetail.volunteerTotal}
        </span>
      </div>

      {/* Baris 2 */}
      <div className="w-full sm:w-1/2 lg:w-1/4">
        <p>Tugas Relawan</p>
      </div>

      <div className="w-full sm:w-1/2 lg:w-3/4">
        <span className="text-muted-foreground">
          {moreDetail.volunteerTask}
        </span>
      </div>

      {/* Baris 3 */}
      <div className="w-full sm:w-1/2 lg:w-1/4">
        <p>Perlengkapan Relawan</p>
      </div>

      <div className="w-full sm:w-1/2 lg:w-3/4">
        <span className="text-muted-foreground">
          {moreDetail.volunteerTools}
        </span>
      </div>

      {/* Baris 4 */}
      <div className="w-full sm:w-1/2 lg:w-1/4">
        <p>Informasi Tambahan</p>
      </div>

      <div className="w-full sm:w-1/2 lg:w-3/4">
        <span className="text-muted-foreground">
          {moreDetail.moreInformation}
        </span>
      </div>
    </div>
  );
};
