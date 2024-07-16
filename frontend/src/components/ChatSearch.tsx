import { FontSans } from "./FontSans";
import { Search } from "react-feather";

export const ChatSearch = () => {
  return (
    <div className="p-2 bg-slate-300 flex items-center space-x-2 w-60 rounded">
      <Search />
      <FontSans title="Search" fontSize="13px" fontWeight={600} color="grey" />
    </div>
  );
};
