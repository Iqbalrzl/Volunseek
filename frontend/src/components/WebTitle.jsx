import { Link } from "react-router-dom";

export const WebTitle = () => {
  return (
    <Link to={"/"}>
      <p className="text-xl font-bold text-mainColor hover:cursor-pointer ">
        VolunSeek
      </p>
    </Link>
  );
};
