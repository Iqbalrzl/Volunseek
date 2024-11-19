import { Button } from "./ui/button";
import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const ActivityCard = (props) => {
  const {
    id,
    name_event,
    start_event,
    end_event,
    location_event,
    event_type,
    imageUrl,
  } = props;

  const loadActivity = async () => {
    try {
      await axiosInstance.get("/api/events/?format=json");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadActivity();
  }, []);

  return (
    <div className="flex-1 rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Image Section */}
      <img
        src={imageUrl}
        alt="Activity Image"
        className="w-full h-40 object-cover"
      />

      {/* Details Section */}
      <div className="p-4">
        {/* Categories */}
        <div className="flex gap-2 mb-2">
          <span className="text-xs bg-green-200 text-green-700 px-2 py-1 rounded">
            {event_type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2">{name_event}</h3>

        {/* Date Range */}
        <p className="text-sm text-gray-600 mb-1">{start_event}</p>
        <p className="text-sm text-gray-600 mb-1">{end_event}</p>

        {/* Location */}
        <p className="text-sm text-gray-600 mb-4">{location_event}</p>

        {/* Button */}
        <Link to={"/detail-activity/" + id}>
          <Button className="w-full bg-[#D1F2EB] text-primary hover:bg-[#D1F2EB] hover:opacity-60">
            Lihat Lebih Lengkap
          </Button>
        </Link>
      </div>
    </div>
  );
};
