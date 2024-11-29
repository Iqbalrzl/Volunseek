import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DetailContent = () => {
  const params = useParams();
  const [moreDetail, setMoreDetail] = useState({
    task: "",
    tools: "",
    information: "",
  });

  const [detailParticipants, setDetailParticipants] = useState({
    max_participants: "",
  });

  const fetchDetail = async (eventId) => {
    try {
      const resDetail = await axiosInstance.get(`/api/detail/${eventId}/`);
      setMoreDetail(resDetail.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDetail2 = async (eventId) => {
    try {
      const resDetail1 = await axiosInstance.get(`/api/event/${eventId}/`);
      setDetailParticipants(resDetail1.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetail(params.eventId);
    fetchDetail2(params.eventId);
  }, [params.eventId]);

  return (
    <div className="flex flex-wrap gap-y-6 sm:gap-y-8">
      {/* Bagian Kiri */}
      <div className="w-full sm:w-1/2 lg:w-1/4">
        <p>Total Relawan</p>
      </div>

      {/* Bagian Kanan */}
      <div className="w-full sm:w-1/2 lg:w-3/4">
        <span className="text-muted-foreground">
          {detailParticipants.max_participants}
        </span>
      </div>

      {/* Baris 2 */}
      <div className="w-full sm:w-1/2 lg:w-1/4 ">
        <p>Tugas Relawan</p>
      </div>

      <div className="w-full sm:w-1/2 lg:w-3/4">
        <span className="text-muted-foreground">{moreDetail.task}</span>
      </div>

      {/* Baris 3 */}
      <div className="w-full sm:w-1/2 lg:w-1/4 ">
        <p>Perlengkapan Relawan</p>
      </div>

      <div className="w-full sm:w-1/2 lg:w-3/4">
        <span className="text-muted-foreground">{moreDetail.tools}</span>
      </div>

      {/* Baris 4 */}
      <div className="w-full sm:w-1/2 lg:w-1/4 ">
        <p>Informasi Tambahan</p>
      </div>

      <div className="w-full sm:w-1/2 lg:w-3/4 ">
        <span className="text-muted-foreground whitespace-pre-wrap">
          {moreDetail.information}
        </span>
      </div>
    </div>
  );
};
