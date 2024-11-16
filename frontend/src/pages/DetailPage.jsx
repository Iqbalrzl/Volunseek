import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { DetailContent } from "@/components/DetailContent";
import { Card, CardTitle } from "@/components/ui/card";

export const DetailPage = () => {
  const params = useParams();
  const [detail, setDetail] = useState({
    id: 0,
    name_event: "",
    date_event: "",
    location_event: "",
    event_type: "",
    imageUrl: " ",
  });

  const fetchActivity = async () => {
    try {
      const res = await axiosInstance.get("/cards/" + params.activityId);
      setDetail(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <>
      <main className="min-h-screen p-10 mt-8 bg-[#D1F2EB]">
        <Card className="flex w-full">
          <div className="flex flex-col sm:flex-row px-8 py-8 w-full gap-8">
            {/* Gambar berada di bagian atas untuk small devices */}
            <div className="flex-shrink-0 sm:w-1/3">
              <img
                src={detail.imageUrl}
                alt={detail.name_event}
                className="object-cover w-full h-[300px] rounded-lg"
              />
            </div>

            {/* Konten teks */}
            <div className="flex flex-col w-full gap-2">
              <CardTitle className="mb-4">{detail.name_event}</CardTitle>
              <p className="text-muted-foreground">
                Jenis Kegiatan: {detail.event_type}
              </p>
              <p className="text-muted-foreground">
                Lokasi: {detail.location_event}
              </p>
              <p className="text-muted-foreground">
                Jadwal Kegiatan: {detail.date_event}
              </p>
              <p className="text-muted-foreground">{detail.desc}</p>
            </div>
          </div>
        </Card>
        <div className="flex flex-col sm:flex-row mt-8 gap-4">
          <Card className="w-full sm:w-7/12 p-10 ">
            <CardTitle className=" pb-8">Detail Aktivitas</CardTitle>
            <DetailContent />
          </Card>

          <Card className="w-full sm:w-5/12 p-10">
            <CardTitle className=" pb-8">Relawan</CardTitle>
          </Card>
        </div>
      </main>
    </>
  );
};
