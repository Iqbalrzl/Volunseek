import { Carousel } from "@material-tailwind/react";

export const ImageSlide = () => {
  return (
    <Carousel className="rounded-xl relative" navigation={() => null}>
      <div className="relative">
        <img
          src="https://th.bing.com/th/id/OIP.I9WeCF7vg_T3z26krP9MhgHaEK?w=295&h=180&c=7&r=0&o=5&dpr=1.9&pid=1.7"
          alt="image 1"
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
      </div>

      <div className="relative">
        <img
          src="https://th.bing.com/th/id/OIP.lRwhtNWVMNnnK8KZx56nagHaE7?w=261&h=180&c=7&r=0&o=5&dpr=1.9&pid=1.7"
          alt="image 2"
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
      </div>

      <div className="relative">
        <img
          src="https://inilahonline.com/wp-content/uploads/2017/12/Relawan-RZ-1.jpg"
          alt="image 3"
          className="h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
      </div>
    </Carousel>
  );
};
