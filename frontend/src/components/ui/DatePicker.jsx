import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export const DatePicker = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  return (
    <Datepicker
      useRange={false}
      asSingle={true}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};
