import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { axiosInstance } from "@/lib/axios";
import { useEffect } from "react";

export const ActivityCard = (props) => {
  const { imageUrl, name_event, event_type, date_event, location_event } =
    props;

  const loadActivity = async () => {
    try {
      await axiosInstance.get("/cards");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadActivity();
  }, []);

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer">
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
          <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded">
            {event_type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2">{name_event}</h3>

        {/* Date Range */}
        <p className="text-sm text-gray-600 mb-1">{date_event}</p>

        {/* Location */}
        <p className="text-sm text-gray-600 mb-4">{location_event}</p>

        {/* Button */}
        <Button className="w-full bg-[#D1F2EB] text-primary hover:bg-[#D1F2EB] hover:opacity-60">
          Lihat Lebih Lengkap
        </Button>
      </div>
    </div>
  );
};
ActivityCard.propTypes = {
  imageUrl: PropTypes.string,
  name_event: PropTypes.string,
  event_type: PropTypes.string,
  date_event: PropTypes.string,
  location_event: PropTypes.string,
};
