import { Carousel } from "@material-tailwind/react";

export const ImageSlide = () => {
  return (
    <Carousel className="rounded-xl relative" navigation={() => null}>
      <div className="relative">
        <img
          src="http://127.0.0.1:8000/media/event/images/Seattle-Area_Volunteer_Opportunities_for_Families.jpeg"
          alt="image 1"
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
      </div>

      <div className="relative">
        <img
          src="http://127.0.0.1:8000/media/event/images/1285856c492a8ef5bef18bbcc9a060e8.jpg"
          alt="image 2"
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
      </div>

      <div className="relative">
        <img
          src="http://127.0.0.1:8000/media/event/images/Look_how_far_weve_come__Volunteering.jpeg"
          alt="image 3"
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
      </div>
    </Carousel>
  );
};
