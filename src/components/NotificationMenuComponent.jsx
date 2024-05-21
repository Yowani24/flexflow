import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  Badge,
} from "@material-tailwind/react";
import { GoBellFill } from "react-icons/go";
import useFetchData from "../../hook/useFetchData";

function ClockIcon() {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.99998 14.9C9.69736 14.9 11.3252 14.2257 12.5255 13.0255C13.7257 11.8252 14.4 10.1974 14.4 8.49998C14.4 6.80259 13.7257 5.17472 12.5255 3.97449C11.3252 2.77426 9.69736 2.09998 7.99998 2.09998C6.30259 2.09998 4.67472 2.77426 3.47449 3.97449C2.27426 5.17472 1.59998 6.80259 1.59998 8.49998C1.59998 10.1974 2.27426 11.8252 3.47449 13.0255C4.67472 14.2257 6.30259 14.9 7.99998 14.9ZM8.79998 5.29998C8.79998 5.0878 8.71569 4.88432 8.56566 4.73429C8.41563 4.58426 8.21215 4.49998 7.99998 4.49998C7.7878 4.49998 7.58432 4.58426 7.43429 4.73429C7.28426 4.88432 7.19998 5.0878 7.19998 5.29998V8.49998C7.20002 8.71213 7.28434 8.91558 7.43438 9.06558L9.69678 11.3288C9.7711 11.4031 9.85934 11.4621 9.95646 11.5023C10.0536 11.5425 10.1577 11.5632 10.2628 11.5632C10.3679 11.5632 10.472 11.5425 10.5691 11.5023C10.6662 11.4621 10.7544 11.4031 10.8288 11.3288C10.9031 11.2544 10.9621 11.1662 11.0023 11.0691C11.0425 10.972 11.0632 10.8679 11.0632 10.7628C11.0632 10.6577 11.0425 10.5536 11.0023 10.4565C10.9621 10.3593 10.9031 10.2711 10.8288 10.1968L8.79998 8.16878V5.29998Z"
        fill="#90A4AE"
      />
    </svg>
  );
}

export default function NotificationMenuComponent() {
  const { notificationEvents } = useFetchData();

  return (
    <Menu>
      <MenuHandler>
        {2 > 4 ? (
          <Badge content={2}>
            <div className="bg-white rounded-full text-gray-600 w-7 h-7 flex items-center justify-center shadow-md cursor-pointer">
              <GoBellFill size={18} />
            </div>
          </Badge>
        ) : (
          <div className="bg-white rounded-full text-gray-600 w-7 h-7 flex items-center justify-center shadow-md cursor-pointer">
            <GoBellFill size={18} />
          </div>
        )}
      </MenuHandler>
      <MenuList className="flex flex-col gap-2">
        {/* {notificationEvents.map((event, index) => (
          <MenuItem
            key={index}
            className="flex items-center gap-4 py-2 pl-2 pr-8 bg-white"
          >
            <Avatar
              variant="circular"
              alt="tania andrew"
              size="sm"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <div className="flex flex-col gap-1">
              <Typography
                variant="small"
                color="gray"
                className="font-semibold text-xs"
              >
                {event.message}
              </Typography>
              <Typography className="flex items-center gap-1 text-xs font-medium text-blue-gray-500">
                <ClockIcon />
                13 minutes ago
              </Typography>
            </div>
          </MenuItem>
        ))} */}
      </MenuList>
    </Menu>
  );
}
