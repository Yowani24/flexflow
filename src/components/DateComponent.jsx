import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { ptBR, pt } from "date-fns/locale";

export default function DateComponent({ setDeadlineTime }) {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

  const handeSelectTime = (time) => {
    setSelectedDay(time);
    setDeadlineTime(time);
  };

  return (
    <div className="">
      <Popover placement="top-start">
        <PopoverHandler>
          <Chip
            value={format(selectedDay, "PPP")}
            className="w-fit capitalize rounded-full h-6"
          />
        </PopoverHandler>
        <PopoverContent className="w-fit z-50">
          <DayPicker
            mode="single"
            required
            selected={selectedDay}
            onSelect={handeSelectTime}
            locale={pt}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// import React from "react";
// import { format } from "date-fns";
// import { DayPicker } from "react-day-picker";
// import {
//   Popover,
//   PopoverHandler,
//   PopoverContent,
//   Chip,
// } from "@material-tailwind/react";
// import { pt } from "date-fns/locale";

// export default function DateComponent({ onChange, value }) {
//   return (
//     <div className="">
//       <Popover placement="top-start">
//         <PopoverHandler>
//           <Chip
//             value={format(value, "PPP")}
//             className="w-fit capitalize rounded-full h-6"
//           />
//         </PopoverHandler>
//         <PopoverContent className="w-fit z-50">
//           <DayPicker
//             mode="single"
//             required
//             selected={value}
//             onSelect={onChange}
//             locale={pt}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

// import React from "react";
// import { format } from "date-fns";
// import { DayPicker } from "react-day-picker";
// import {
//   Popover,
//   PopoverHandler,
//   PopoverContent,
//   Chip,
// } from "@material-tailwind/react";
// import { pt } from "date-fns/locale";

// export default function DateComponent({ onChange, value }) {
//   // Check if value is a valid date object
//   const formattedValue = value instanceof Date ? format(value, "PPP") : "";

//   return (
//     <div className="">
//       <Popover placement="top-start">
//         <PopoverHandler>
//           <Chip
//             value={formattedValue}
//             className="w-fit capitalize rounded-full h-6"
//           />
//         </PopoverHandler>
//         <PopoverContent className="w-fit z-50">
//           <DayPicker
//             mode="single"
//             required
//             selected={value}
//             onSelect={onChange}
//             locale={pt}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
